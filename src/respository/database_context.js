import { createContext, useEffect, useState } from "react";
import axios from "axios";

const DataBaseContext = createContext();

function DataBaseTables({ children }) {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState({
    regions: [],
    divisions: [],
    sub_divisions: [],
    users: [],
    admins: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost/web-census/api/users/");
        setData((prevData) => ({ ...prevData, users: usersResponse.data }));

        const regionsResponse = await axios.get("http://localhost/web-census/api/regions/");
        setData((prevData) => ({ ...prevData, regions: regionsResponse.data }));

        const divisionsResponse = await axios.get("http://localhost/web-census/api/divisions/");
        setData((prevData) => ({ ...prevData, divisions: divisionsResponse.data }));

        const subDivisionsResponse = await axios.get("http://localhost/web-census/api/sub_divisions/");
        setData((prevData) => ({ ...prevData, sub_divisions: subDivisionsResponse.data }));

        const adminsResponse = await axios.get("http://localhost/web-census/api/admin/");
        setData((prevData) => ({ ...prevData, admins: adminsResponse.data }));

        setFetching(false);
      } catch (error) {
        setError(error);
        setFetching(false);
      }
    };

    fetchData();
  }, []);


  const regionNames = data.regions.map(region => region.name)

  const filters = {
    getUsersFromRegion : (regionID = '') => {
        if (regionID === '') return data.users;

        let divisions = data.divisions.filter(division => division.region === regionID)
        console.log("Divisions: ", divisions)
        let subDivisions = []
        let users = []
        divisions.map(division => {
            subDivisions.push(...data.sub_divisions.filter(sub => sub.division === division.id));
        })

        console.log("Sub Divisions: ", subDivisions)
    
        subDivisions.map(subs => {
            users.push(...data.users.filter(user => user.sub_division === subs.id))
        })

        console.log("Users: ", users)

        return users;
      }
  }

  return (
    <DataBaseContext.Provider value={{ data, filters, fetching, error }}>
      {children}
    </DataBaseContext.Provider>
  );
}

export { DataBaseTables, DataBaseContext };

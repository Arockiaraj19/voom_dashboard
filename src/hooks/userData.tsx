// hooks/useUserData.js


import { axiosPrivate } from '@/helper/axiosPrivate';
import { useEffect, useState } from 'react';


const useUserData = () => {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if user data exists in local storage
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          console.log("what is the user result");
          console.log(JSON.parse(storedUserData));
          setUserData(JSON.parse(storedUserData));
          setIsLoading(false);
        } else {
          // Fetch user data from API using Axios
          const response = await axiosPrivate.get('/v1/user'); // Assuming you have an API route for user data
          if (response.status === 200) {
           
            const userDataFromApi = response.data;
            console.log("what is the user result");
            console.log(userDataFromApi);
            setUserData(userDataFromApi);
            localStorage.setItem('userData', JSON.stringify(userDataFromApi));
          } else {
            console.error('Failed to fetch user data');
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsLoading(false);
      }
    };

    fetchUserData();

  }, []);

  return { userData, isLoading };
};

export default useUserData;

import { React, useState, useEffect } from 'react'
import { useTheme } from '@mui/material'
import Carousel from '../components/carousel.jsx'
import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import "react-toastify/dist/ReactToastify.css"
import GaugeChart from 'react-gauge-chart'
import { useRef } from 'react'
import EmployeeAppraisal from '../../../api/models/employeeQuarterlyForm.js'



const slides = [
  "/Images/company1.jpg",
  "/Images/company2.jpg",
  "/Images/company3.jpg",
  "/Images/company4.jpg",
]

let employeeData 
// Define the color scheme for the gauge chart
const colors = ['#FF0000', '#FFA500', '#FFFF00', '#00FF00']

function useTimeUpdateInterval(selectedLocation) {
  const [currentTime, setCurrentTime] = useState('');
  const intervalRef = useRef(null);

  const getCurrentTime = () => {
    const currentDate = new Date().toLocaleString("en-US", { timeZone: selectedLocation });
    return new Date(currentDate).toLocaleTimeString();
  };

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentTime())
    };

    const setupTimeUpdateInterval = () => {
      intervalRef.current = setInterval(updateTime, 1000)
    };

    const cleanupInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    setupTimeUpdateInterval();

    return cleanupInterval;
  }, [selectedLocation]);

  return currentTime;
}

function useDesktopFullScreen() {
  const [isDesktopFullScreen, setIsDesktopFullScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopFullScreen(window.innerWidth >= 1024 && window.innerHeight <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isDesktopFullScreen;
}

export default function Admin() {
  const {currentUser} = useSelector((state) => state.user)
  const prevCurrentUser = useRef(currentUser)
  const theme = useTheme()
  const [total, setTotal] = useState(0)
  const [itCount, setItCount] = useState(0)
  const [hasNotified, setHasNotified] = useState(false)
  const [corpersCount, setCorporsCount] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState('Africa/Lagos')
  const [employeeAppraisal, setEmployeeAppraisal] = useState({ formData: {formGridData: []} })
  const [isLoading, setIsloading] = useState(true)
  const [animate, setAnimate] = useState(true)
  const [newsData, setNewsData] = useState([])
  const [error, setError] = useState(null)
  const currentTime = useTimeUpdateInterval(selectedLocation);
  const isDesktopFullScreen = useDesktopFullScreen();
  const intervalRef = useRef(null)
  

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser])


  // fetching the news API
  const url = `https://newsdata.io/api/1/latest?country=ng&apikey=pub_500121f9e49c937a1156a539e8ee5098ff986`
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const articleList = data.results.map(article => ({
          title: article.title,
          content: article.description,
          url: article.link,
          image: article.image_url
        }));
        setNewsData(articleList);
        setIsloading(false);
      })
  }, [currentUser])
  
  useEffect(() => {
    // Set a flag to track if the animation has already been triggered
    let animationTriggered = false

    // Use a requestAnimationFrame loop to check the flag and trigger the animation
    const animationLoop = () => {
      if (animate && !animationTriggered) {
        // Trigger the animation
        animationTriggered = true;
        setAnimate(false);
      }

      // Request the next frame
      requestAnimationFrame(animationLoop);
    };

    // Start the animation loop
    animationLoop();

    // Clean up the animation loop when the component unmounts
    return () => cancelAnimationFrame(animationLoop);
  }, [animate]);

  useEffect(() => {
    async function fetchUserData() {
        try {
          setIsloading(true);
          const response = await fetch(`/report/userReports/${prevCurrentUser.current._id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          if (response.ok) {
            const data = await response.json();
            setEmployeeAppraisal({ formData: data });
          } else {
            setError(`Error fetching user data: ${response.status}`);
          }
        } catch (err) {
          setError(`Error fetching user data: ${err.message}`);
        } finally {
          setIsloading(false);
        }
      }
    fetchUserData()
  }, [currentUser]);

  const handleLocationChange = (location) => {
    setSelectedLocation(location)
  }


  useEffect(() => {
    if (
      employeeAppraisal.formData &&
      employeeAppraisal.formData.formGridData &&
      employeeAppraisal.formData.formGridData.length > 0
    ) {
      setIsloading(false);
      employeeData = employeeAppraisal.formData.formGridData[0]["average"];
    }
  }, [employeeAppraisal.formData]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/employee/staffs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        const data = await response.json();
        setTotal(data.total);
        setItCount(data.itCount);
        // setDepartmentCounts(data.departmentCounts);
        setCorporsCount(data.corpersCount);
      } catch (error) {
        console.log(`Error fetching staff data: ${error}`)
      }
      }
    fetchData()
    
  }, [])

 const hasDisplayedMessage = useRef(false);
  
 const [hasShownWelcomeMessage, setHasShownWelcomeMessage] = useState(false);

 useEffect(() => {
   if (currentUser && !hasShownWelcomeMessage) {
     switch (true) {
       case !localStorage.getItem('hasShownWelcomeMessage'):
         toast(`Welcome! ${currentUser.userName}`);
         localStorage.setItem('hasShownWelcomeMessage', 'true');
         setHasShownWelcomeMessage(true);
         break;
       default:
         break;
     }
   }
 }, [currentUser, hasShownWelcomeMessage]);

  return (
    <div className=' flex flex-col p-5 gap-10 ' style={{ color: theme.palette.grey[900], height: '100vh' }}>
      <div className='flex flex-1'>
        <div className='flex justify-between gap-5' style={{ width: '100%' }}>
          <div style={{
            width: '100%'
            }} className='rounded-lg'>
            <Carousel autoSlide={true}>
              {slides.map((s)=>(
                <img src={s} className='h-64 w-full rounded-lg object-cover'/>
              ))}
            </Carousel>
            {isDesktopFullScreen && (
              <div className="mt-4 flex justify-between text-white px-4 py-2 rounded-lg shadow-md" style={{ position: "", top: "70px", backgroundColor: theme.palette.secondary[500] }}>
              <div className='flex items-center text-md'>
                <p>{selectedLocation.replace('/', ', ')}: {currentTime}</p>
              </div>
              <div className="flex items-center space-x-4">
              <button
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 w-24 text-center"
                  onClick={() => handleLocationChange('Africa/Lagos')}
                >
                  Nigeria
                </button>
                <button
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 w-24 text-center"
            onClick={() => handleLocationChange('America/New_York')}
          >
            New York
          </button>
          <button
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 w-24 text-center"
            onClick={() => handleLocationChange('Europe/London')}
          >
            London
          </button>
          <button
            className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 w-24 text-center"
            onClick={() => handleLocationChange('Asia/Tokyo')}
          >
            Tokyo
          </button>
              </div>
            </div>
            )}
            
          </div>
        </div>
      </div>
      <div className='flex flex-1 bg-purple-200 p-5 rounded-lg'>
        <div className='flex justify-between gap-4' style={{ width: '100%' }}>
          <div className='p-3 rounded-lg' style={{ width: '25%', backgroundColor: "#fff" }}>
            <div className='flex flex-col'>
              <div className='rounded-full'>
                <img src="/Images/adsrStaff.jpeg" alt="" style={{ borderRadius: '10%', marginBottom: "7px"  }}/> 
              </div>
              <div>
                <h3 className='uppercase text-sm md:text-lg font-medium text-gray-800 font-sans'>
                  Number of Staffs: {total}
                </h3>
              </div>
            </div>
          </div>
          <div className='p-3 rounded-lg' style={{ width: '25%',backgroundColor: '#fff' }}>
            <div className='flex flex-col'>
              <div>
                <img src="/Images/departmentImage2.jpg" alt="" style={{ borderRadius: '10%', marginBottom: "7px" }}/>
              </div>
              <div>
                <h3 className='uppercase text-sm md:text-lg font-medium text-gray-800 font-sans'>
                  DEPARTMENTS: 5
                </h3>
              </div>
            </div>
          </div>
          <div className='p-3 rounded-lg' style={{ width: '25%',backgroundColor: "#fff" }}>
          <div className='flex flex-col'>
              <div>
                <img src="/Images/corpersImage.jpg" alt="" style={{ borderRadius: '10%', marginBottom: "7px" }}/>
              </div>
              <div>
              <h3 className='uppercase text-sm md:text-lg font-medium text-gray-800 font-sans'>
                Number of CORPERS: {corpersCount}
              </h3>
              </div>
            </div>
          </div>
          <div className='p-3 rounded-lg' style={{ width: '25%',backgroundColor: "#fff" }}>
            <div className='flex flex-col'>
              <div>
                <img src="/Images/intern2.jpg" alt="" style={{ borderRadius: '10%', marginBottom: "7px" }}/>
              </div>
            </div>
            <div className='flex flex-col gap-2 justify-between' style={{}}>
              <h3 className='uppercase text-sm md:text-lg font-medium text-gray-800 font-sans'>
                Number of IT: {itCount}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-1 gap-5'>
        <div className='flex justify-between gap-5' style={{ width: '100%' }}>
          <div style={{ width: '50%' }} className='flex flex-col bg-gray-200 p-5 rounded-lg'>
            <div className='font-bold uppercase text-xl mb-10'>
              <h3>Staffs Performance</h3>
            </div>
            <div className='flex items-center'>
              <div style={{ width: '30%' }} className='flex flex-col gap-3'>
                <h5 style={{ color: "#ff0000" }} className='font-bold'>
                  Between 0-24 <span className="text-black">Below par</span>
                </h5>
                <h5 style={{ color: "#ffcc00" }} className='font-bold'>
                  Between 25-49 <span className="text-black">Bad</span>
                </h5>
                <h5 style={{ color: "#00ff00" }} className='font-bold'>
                  Between 50-74 <span className="text-black">Normal</span>
                </h5>
                <h5 style={{ color: "#006600" }} className='font-bold'>
                  Between 75-100 <span className="text-black">Good</span>
                </h5>
              </div>
              <div className='flex-1'>
                {isLoading ? (<div>Loading...</div>) : ( <div style={{ width: '100%' }}>
                  <GaugeChart id="gauge-chart6"
                    animate={animate} 
                    nrOfLevels={20} 
                    percent={isNaN(employeeData) ? 0 : (((employeeData/30) * 100)/100)} 
                    needleColor="#345243" 
                    colors={colors}
                  />
                </div>) }
              </div>
            </div>
            
          </div>
          <div className="flex flex-col news-container lg:w-[500px] md:w-[300px] sm:w-[200px] mx-auto flex-1" >
            <div className="border-b pb-2 mb-4">
              <h2 className="text-xl font-bold">BREAKING NEWS</h2>
            </div>
            {isLoading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className="news-items-container max-h-[300px]  overflow-y-auto px-4 bg-gray-300 p-3">
                {Object.values(newsData).map((article, index) => (
                  <div key={index} className="news-item bg-white p-5 rounded-md shadow-md mb-5">
                    <div className='flex'>
                      <div className='flex flex-col' style={{ width: article.image ? '70%' : '100%' }}>
                        <h3 className="text-black uppercase font-bold">{article.title}</h3>
                        <p className="news-content max-h-[100px] overflow-hidden text-ellipsis whitespace-nowrap mb-5 italic">
                          {article.content || ''}
                        </p>
                      </div>
                      {article.image && (
                        <div className='flex flex-1 items-center'>
                          <img src={article.image} alt="" className="h-[80px] object-cover"/>
                        </div>
                      )}
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Read More
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


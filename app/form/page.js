"use client"
import { useState } from 'react';
import Select from 'react-select';
import { FaMapMarkerAlt, FaBuilding, FaUsers, FaChartLine } from 'react-icons/fa';
import Image from 'next/image';
import {
  BsFacebook,
  BsLinkedin,
  BsWhatsapp,
  BsInstagram,
  BsTiktok
} from 'react-icons/bs';
import "./style.css";


const styles = {
    container: {
      background: 'linear-gradient(135deg, #EBF4FF 0%, #F9FAFB 100%)',
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    pageTitle: {
      fontSize: '2.5rem',
      color: '#1E40AF',
      textAlign: 'center',
      marginBottom: '2rem',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },
    formContainer: {
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'row', // Changed to row
        gap: '2rem',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      },
      illustrationContainer: {
        flex: '0 0 45%', // Changed to take up 45% of the space
        display: 'block',
        '@media (maxWidth: 1024px)': {
          display: 'none'
        }
      },
      formWrapper: {
        flex: '0 0 45%', // Changed to take up 45% of the space
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        color:'grey',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
      },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '0.5rem',
      border: '1px solid #E5E7EB',
      transition: 'all 0.3s ease',
      fontSize: '0.875rem',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: 'black',
      marginBottom: '0.5rem'
    },
    icon: {
      marginRight: '0.5rem',
      color: '#2563EB'
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#2563EB',
      color: 'white',
      borderRadius: '0.5rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 6px rgba(37, 99, 235, 0.1)',
      ':hover': {
        backgroundColor: '#1D4ED8',
        transform: 'translateY(-1px)',
        boxShadow: '0 6px 8px rgba(37, 99, 235, 0.2)'
      }
    }
  };

export default function Form() {
  // States for form data
  const [employeeRange, setEmployeeRange] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState(null);
  const [socialMediaExp, setSocialMediaExp] = useState(3);
  const [socialPlatforms, setSocialPlatforms] = useState({
    facebook: false,
    linkedin: false,
    whatsapp: false,
    instagram: false,
    tiktok: false
  });
  const experienceLevels = {
    1: 'Beginner',
    2: 'Basic',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  };
  const [businessDesc, setBusinessDesc] = useState('');

  // Complete industry options
  const industryOptions = [
    { value: 'agriculture', label: 'Agriculture, Forestry, Fishing and Hunting' },
    { value: 'mining', label: 'Mining, Quarrying, and Oil and Gas Extraction' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'construction', label: 'Construction' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'wholesale', label: 'Wholesale Trade' },
    { value: 'retail', label: 'Retail Trade' },
    { value: 'transportation', label: 'Transportation and Warehousing' },
    { value: 'information', label: 'Information' },
    { value: 'finance', label: 'Finance and Insurance' },
    { value: 'realestate', label: 'Real Estate and Rental and Leasing' },
    { value: 'professional', label: 'Professional, Scientific, and Technical Services' },
    { value: 'management', label: 'Management of Companies and Enterprises' },
    { value: 'administrative', label: 'Administrative and Support Services' },
    { value: 'educational', label: 'Educational Services' },
    { value: 'healthcare', label: 'Health Care and Social Assistance' },
    { value: 'arts', label: 'Arts, Entertainment, and Recreation' },
    { value: 'accommodation', label: 'Accommodation and Food Services' },
    { value: 'other', label: 'Other Services (except Public Administration)' },
    { value: 'public', label: 'Public Administration' }
  ];

  const handleEmployeeRangeChange = (range) => {
    setEmployeeRange(range);
  };

  const handleSocialPlatformChange = (platform) => {
    setSocialPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const onPlaceSelected = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.formatted_address) {
      setLocation(place.formatted_address);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
          );
          const data = await response.json();
          setLocation(data.display_name);
        } catch (error) {
          console.error('Error fetching location:', error);
        }
      });
    }
  };




  return (
<div style={styles.container}>
    <h1 style={styles.pageTitle}>
      Tell Us More About Your Business
      <div style={{
        width: '60px',
        height: '4px',
        background: '#2563EB',
        margin: '1rem auto',
        borderRadius: '2px'
      }}></div>
    </h1>

    <div style={styles.formContainer}>
      <div style={styles.illustrationContainer}>
        <Image
          src="https://img.freepik.com/free-vector/business-team-putting-together-jigsaw-puzzle-isolated-flat-vector-illustration-cartoon-partners-working-connection-teamwork-partnership-cooperation-concept_74855-9814.jpg"
          alt="Business Illustration"
          width={500}
          height={500}
          priority
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '500px',
            display: 'block',
            margin: '0 auto'
          }}
        />
      </div>

      {/* Form container */}
      <div style={styles.formWrapper}>
        <form className="space-y-6">
          {/* Rest of your form components with inline styles */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={styles.label}>
              <FaUsers style={styles.icon} />
              Number of Employees
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {['0-10', '10-50', '50-100', '100+'].map((range) => (
                <div 
                  key={range} 
                  className={`flex items-center p-2 border rounded-lg cursor-pointer transition-all
                    ${employeeRange === range ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'}`}
                  onClick={() => handleEmployeeRangeChange(range)}
                >
                  <input
                    type="radio"
                    name="employeeRange"
                    value={range}
                    checked={employeeRange === range}
                    onChange={() => handleEmployeeRangeChange(range)}
                    className="h-3 w-3 text-blue-600"
                  />
                  <label className="ml-2 text-sm text-gray-600">{range}</label>
                </div>
              ))}
            </div>
          </div>
  
          {/* Business Location */}
          <div className="space-y-1">
            <label className="flex items-center text-md font-medium text-gray-700">
              <FaMapMarkerAlt className="mr-2 text-blue-600" />
              Business Location
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Enter your business location"
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <FaMapMarkerAlt className="text-lg" />
              </button>
            </div>
          </div>
  
          {/* Industry Type */}
          <div className="space-y-1">
            <label className="flex items-center text-md font-medium text-gray-700">
              <FaBuilding className="mr-2 text-blue-600" />
              Primary Industry
            </label>
            <Select
              options={industryOptions}
              value={industry}
              onChange={setIndustry}
              className="w-full text-sm"
              placeholder="Select your industry"
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: '38px',
                  borderRadius: '0.5rem',
                  '&:hover': { borderColor: '#3B82F6' }
                }),
                menu: (base) => ({
                  ...base,
                  fontSize: '0.875rem'
                })
              }}
            />
          </div>
  
          {/* Social Media Experience */}
          <div className="space-y-2">
            <label className="flex items-center text-md font-medium text-gray-700">
              <FaChartLine className="mr-2 text-blue-600" />
              Social Media Experience
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="5"
                value={socialMediaExp}
                onChange={(e) => setSocialMediaExp(e.target.value)}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-600">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div 
                    key={num}
                    className={`flex flex-col items-center ${
                      parseInt(socialMediaExp) === num ? 'text-blue-600 font-medium' : ''
                    }`}
                  >
                    <span>{num}</span>
                    <span>{experienceLevels[num]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Social Media Platforms */}
          <div className="space-y-2">
            <label className="flex items-center text-md font-medium text-gray-700">
              Social Media Platforms Used
            </label>
            <div className="grid grid-cols-5 gap-3">
              {[
                { name: 'facebook', icon: BsFacebook, color: '#1877F2' },
                { name: 'linkedin', icon: BsLinkedin, color: '#0A66C2' },
                { name: 'whatsapp', icon: BsWhatsapp, color: '#25D366' },
                { name: 'instagram', icon: BsInstagram, color: '#E4405F' },
                { name: 'tiktok', icon: BsTiktok, color: '#000000' },
              ].map(({ name, icon: Icon, color }) => (
                <div
                  key={name}
                  onClick={() => handleSocialPlatformChange(name)}
                  className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition-all
                    ${socialPlatforms[name] 
                      ? 'bg-gray-50 shadow-inner border border-blue-200' 
                      : 'hover:bg-gray-50'}`}
                >
                  <Icon className="text-xl mb-1" style={{ color }} />
                  <span className="text-xs capitalize">{name}</span>
                  <input
                    type="checkbox"
                    checked={socialPlatforms[name]}
                    onChange={() => handleSocialPlatformChange(name)}
                    className="mt-1 h-3 w-3 text-blue-600"
                  />
                </div>
              ))}
            </div>
          </div>
  
          {/* Business Description */}
          <div className="space-y-1">
            <label className="flex items-center text-md font-medium text-gray-700">
              Additional Information
            </label>
            <textarea
              value={businessDesc}
              onChange={(e) => setBusinessDesc(e.target.value)}
              maxLength={50}
              rows={2}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Describe your business (max 50 words)"
            />
            <div className="text-xs text-gray-500 text-right">
              {businessDesc.length}/50 words
            </div>
          </div>
  
          <button
            type="submit"
            style={{
              ...styles.button,
              marginTop: '2rem'
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
);
}
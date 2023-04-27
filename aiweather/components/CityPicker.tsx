"use client";
import { Country, City } from "country-state-city";
import Select from "react-select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlobeIcon } from "@heroicons/react/solid";

//setup type
type options = {
  value: {
    latitude: string;
    longitude: string;
    isoCode: string;
  };
  label: string;
} | null;

type cityOptions = {
  value: {
    latitude: string;
    longitude: string;
    countryCode: string;
    name: string;
    stateCode: string;
  };
  label: string;
} | null;

// setup city country data

const options = Country.getAllCountries().map((country) => ({
  value: {
    latitude: country.latitude,
    longitude: country.longitude,
    isoCode: country.isoCode,
  },
  label: country.name,
}));

function CityPicker() {
  const [selectedCountry, setSelectedCountry] = useState<option>(null);

  const [selectedCity, setSelectedCity] = useState<cityOptions>(null);

  const router = useRouter();

  const handleSelectedCountry = (option: option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option: cityOptions) => {
    setSelectedCity(option);
    // router.push(
    //   `/location/${opiton?.value.latitude}/${option?.value.longitude}`
    // );
  };
  return (

    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-white/80">
          <GlobeIcon className="h-5 w-5 text-white" />
          <label htmlFor="country">Country</label>
        </div>
        <Select
          className="text-black"
          options={options}
          value={selectedCountry}
          onChange={handleSelectedCountry}
        />
      </div>

      {selectedCountry && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-white/80">
            <GlobeIcon className="h-5 w-5 text-white" />
            <label htmlFor="country">Country</label>
          </div>
          <Select
            className="text-black"
            options={City.getCitiesOfCountry(selectedCountry.value.isoCode)?.map(state=>({
              latitude: state.latitude,
              longitude: state.longitude,
              countryCode: state.countryCode,
              name: state.name,
              stateCode: state.stateCodeS
            }, label: state.name))}
            value={selectedCity}
            onChange={handleSelectedCity}
          />
        </div>
      )}
    </div>
   
 
  );
}

export default CityPicker;

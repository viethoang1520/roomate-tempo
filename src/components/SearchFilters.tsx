import React, { useState } from "react";
import { Search, X, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface SearchFiltersProps {
  onSearch?: (filters: FilterState) => void;
  onReset?: () => void;
}

interface FilterState {
  searchTerm: string;
  priceRange: [number, number];
  roommates: number | null;
  gender: "any" | "male" | "female";
  amenities: {
    wifi: boolean;
    ac: boolean;
    elevator: boolean;
    parking: boolean;
    gym: boolean;
    pool: boolean;
  };
  distanceToFPT: number | null;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch = () => {},
  onReset = () => {},
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    priceRange: [2, 15],
    roommates: null,
    gender: "any",
    amenities: {
      wifi: false,
      ac: false,
      elevator: false,
      parking: false,
      gym: false,
      pool: false,
    },
    distanceToFPT: null,
  });

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: [value[0], value[1]] as [number, number],
    });
  };

  const handleRoommatesChange = (value: number) => {
    setFilters({ ...filters, roommates: value });
  };

  const handleGenderChange = (value: "any" | "male" | "female") => {
    setFilters({ ...filters, gender: value });
  };

  const handleAmenityChange = (
    amenity: keyof FilterState["amenities"],
    checked: boolean,
  ) => {
    setFilters({
      ...filters,
      amenities: {
        ...filters.amenities,
        [amenity]: checked,
      },
    });
  };

  const handleDistanceChange = (value: number[]) => {
    setFilters({ ...filters, distanceToFPT: value[0] });
  };

  const handleReset = () => {
    setFilters({
      searchTerm: "",
      priceRange: [2, 15],
      roommates: null,
      gender: "any",
      amenities: {
        wifi: false,
        ac: false,
        elevator: false,
        parking: false,
        gym: false,
        pool: false,
      },
      distanceToFPT: null,
    });
    onReset();
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <Card className="w-full bg-white p-4 shadow-md rounded-lg">
      <div className="flex flex-col space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by building name (e.g., S1.01)"
            value={filters.searchTerm}
            onChange={handleSearchTermChange}
            className="pl-10 h-12 text-base"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          {filters.searchTerm && (
            <button
              onClick={() => setFilters({ ...filters, searchTerm: "" })}
              className="absolute right-3 top-3.5"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Toggle Filters Button */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Sliders className="h-4 w-4" />
            {isExpanded ? "Hide Filters" : "Show Filters"}
          </Button>
          <div className="text-sm text-gray-500">
            {Object.values(filters.amenities).filter(Boolean).length > 0 && (
              <span className="mr-2">
                {Object.values(filters.amenities).filter(Boolean).length}{" "}
                amenities
              </span>
            )}
            {filters.priceRange[0] !== 2 || filters.priceRange[1] !== 15 ? (
              <span className="mr-2">
                {filters.priceRange[0]}-{filters.priceRange[1]} million VND
              </span>
            ) : null}
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {/* Price Range */}
            <div className="space-y-2">
              <h3 className="font-medium">Price Range (million VND)</h3>
              <div className="pt-4">
                <Slider
                  defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
                  max={15}
                  min={2}
                  step={0.5}
                  onValueChange={handlePriceRangeChange}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{filters.priceRange[0]} million</span>
                <span>{filters.priceRange[1]} million</span>
              </div>
            </div>

            {/* Number of Roommates */}
            <div className="space-y-2">
              <h3 className="font-medium">Number of Roommates</h3>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <Button
                    key={num}
                    variant={filters.roommates === num ? "default" : "outline"}
                    className="h-10"
                    onClick={() => handleRoommatesChange(num)}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>

            {/* Gender Preference */}
            <div className="space-y-2">
              <h3 className="font-medium">Gender Preference</h3>
              <RadioGroup
                value={filters.gender}
                onValueChange={(value) =>
                  handleGenderChange(value as "any" | "male" | "female")
                }
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="any" id="any" />
                  <Label htmlFor="any">Any</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Amenities */}
            <div className="space-y-2 lg:col-span-2">
              <h3 className="font-medium">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wifi"
                    checked={filters.amenities.wifi}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("wifi", checked as boolean)
                    }
                  />
                  <Label htmlFor="wifi">WiFi</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ac"
                    checked={filters.amenities.ac}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("ac", checked as boolean)
                    }
                  />
                  <Label htmlFor="ac">Air Conditioning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="elevator"
                    checked={filters.amenities.elevator}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("elevator", checked as boolean)
                    }
                  />
                  <Label htmlFor="elevator">Elevator</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="parking"
                    checked={filters.amenities.parking}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("parking", checked as boolean)
                    }
                  />
                  <Label htmlFor="parking">Parking</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gym"
                    checked={filters.amenities.gym}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("gym", checked as boolean)
                    }
                  />
                  <Label htmlFor="gym">Gym</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="pool"
                    checked={filters.amenities.pool}
                    onCheckedChange={(checked) =>
                      handleAmenityChange("pool", checked as boolean)
                    }
                  />
                  <Label htmlFor="pool">Swimming Pool</Label>
                </div>
              </div>
            </div>

            {/* Distance to FPT University */}
            <div className="space-y-2">
              <h3 className="font-medium">
                Max Distance to FPT University (km)
              </h3>
              <div className="pt-4">
                <Slider
                  defaultValue={[filters.distanceToFPT || 5]}
                  max={10}
                  min={1}
                  step={0.5}
                  onValueChange={handleDistanceChange}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 km</span>
                <span>{filters.distanceToFPT || 5} km</span>
                <span>10 km</span>
              </div>
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" onClick={handleReset}>
              Reset Filters
            </Button>
            <Button
              onClick={handleSearch}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Apply Filters
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SearchFilters;

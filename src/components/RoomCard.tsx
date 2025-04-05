import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wifi, Thermometer, Coffee, MapPin, Users } from "lucide-react";

interface RoomCardProps {
  id?: string;
  imageUrl?: string;
  price?: number;
  buildingName?: string;
  availableSpots?: number;
  totalSpots?: number;
  amenities?: string[];
  distance?: string;
  onViewDetails?: (id: string) => void;
}

const RoomCard = ({
  id = "1",
  imageUrl = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
  price = 3500000,
  buildingName = "S1.01",
  availableSpots = 2,
  totalSpots = 4,
  amenities = ["wifi", "ac", "kitchen"],
  distance = "1.5km to FPT University",
  onViewDetails = () => {},
}: RoomCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "ac":
        return <Thermometer className="h-4 w-4" />;
      case "kitchen":
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-[350px] overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={`Room in ${buildingName}`}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge
          variant="secondary"
          className="absolute top-2 right-2 bg-green-100 text-green-800 font-medium"
        >
          {formatPrice(price)} VND/month
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {buildingName}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>
              {availableSpots}/{totalSpots} spots
            </span>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{distance}</span>
        </div>

        <div className="flex space-x-2">
          {amenities.map((amenity, index) => (
            <Badge
              key={index}
              variant="outline"
              className="flex items-center gap-1 bg-gray-50"
            >
              {getAmenityIcon(amenity)}
              <span className="capitalize">{amenity}</span>
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onViewDetails(id)}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;

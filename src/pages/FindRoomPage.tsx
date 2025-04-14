import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SearchFilters from "@/components/SearchFilters";
import RoomCard from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Mock data for rooms
const mockRooms = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80",
    price: 3500000,
    buildingName: "S1.01",
    availableSpots: 2,
    totalSpots: 4,
    amenities: ["wifi", "ac", "kitchen"],
    distance: "1.5km to FPT University",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=500&q=80",
    price: 4200000,
    buildingName: "S2.05",
    availableSpots: 1,
    totalSpots: 3,
    amenities: ["wifi", "ac"],
    distance: "2km to FPT University",
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=500&q=80",
    price: 5000000,
    buildingName: "S3.12",
    availableSpots: 3,
    totalSpots: 5,
    amenities: ["wifi", "ac", "kitchen"],
    distance: "1km to FPT University",
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=500&q=80",
    price: 3800000,
    buildingName: "S1.08",
    availableSpots: 1,
    totalSpots: 2,
    amenities: ["wifi"],
    distance: "1.8km to FPT University",
  },
  {
    id: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500&q=80",
    price: 4500000,
    buildingName: "S2.10",
    availableSpots: 2,
    totalSpots: 4,
    amenities: ["wifi", "ac", "kitchen"],
    distance: "2.2km to FPT University",
  },
  {
    id: "6",
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&q=80",
    price: 3200000,
    buildingName: "S1.15",
    availableSpots: 1,
    totalSpots: 3,
    amenities: ["wifi", "kitchen"],
    distance: "1.3km to FPT University",
  },
];

const FindRoomPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const roomsPerPage = 6;

  // Simulate API call
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // In a real app, this would be an API call
        const totalResults = mockRooms.length;
        setTotalPages(Math.ceil(totalResults / roomsPerPage));

        // Get current page of rooms
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        const paginatedRooms = mockRooms.slice(startIndex, endIndex);

        setRooms(paginatedRooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, [currentPage]);

  const handleSearch = (filters: any) => {
    console.log("Search with filters:", filters);
    // In a real app, this would trigger a new API call with filters
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleReset = () => {
    console.log("Filters reset");
    // In a real app, this would reset filters and fetch all rooms
    setCurrentPage(1); // Reset to first page when resetting filters
  };

  const handleViewDetails = (id: string) => {
    console.log("View details for room:", id);
    // In a real app, this would navigate to the room details page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {t("findRoom.title", "Find Your Perfect Room")}
      </h1>

      <div className="mb-8">
        <SearchFilters onSearch={handleSearch} onReset={handleReset} />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin mb-4" />
          <p className="text-gray-600">
            {t("findRoom.loading", "Loading available rooms...")}
          </p>
        </div>
      ) : (
        <>
          {rooms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {t(
                  "findRoom.noResults",
                  "No rooms found matching your criteria.",
                )}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    id={room.id}
                    imageUrl={room.imageUrl}
                    price={room.price}
                    buildingName={room.buildingName}
                    availableSpots={room.availableSpots}
                    totalSpots={room.totalSpots}
                    amenities={room.amenities}
                    distance={room.distance}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-10">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4"
                  >
                    {t("pagination.previous", "Previous")}
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 ${currentPage === page ? "bg-green-600 hover:bg-green-700" : ""}`}
                      >
                        {page}
                      </Button>
                    ),
                  )}

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4"
                  >
                    {t("pagination.next", "Next")}
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FindRoomPage;

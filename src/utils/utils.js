import { domain } from "./api";

export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

export const saveToLocalStore = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data));
};

export const getFromLocalStore = (name) => {
    try {
        return JSON.parse(localStorage.getItem(name));
    } catch (error) {
        console.log(error);
    }
};

const getLastPart = (str) => {
    if (str?.includes("/")) {
        const parts = str?.split('/');
        return parts[parts?.length - 1];
    } else {
        return str;
    }
};

export const getImageDirectory = (image) => {
    return `${domain}/uploads/${getLastPart(image)}`
    // return `../../../tolet-api-wap/uploads/${image}`;
}

export const getDate = () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 10);

    const formattedDate = futureDate.toLocaleDateString('en-CA');

    return formattedDate;
}

export const currentDate = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-CA');

    return formattedDate;
}

export const getProperties = () => {
    const properties = [
        {
            id: 1,
            name: "House in Saint Helena Island with Pool",
            roomNumber: 3,
            availableFrom: "2024-09-01",
            type: "House",
            size: "1680 ft²",
            guests: 6,
            location: "Saint Helena Island",
            distance: "1.2 mi from city center",
            rating: 5.0,
            reviews: 1,
            price: 239,
            imageUrl: ["/images/image-1.jpg", "/images/image-2.jpg"],
        },
        {
            id: 2,
            name: "Condo in Saint Helena Island with Indoor Pool + B...",
            roomNumber: 2,
            availableFrom: "2024-08-15",
            type: "Condo",
            size: "1500 ft²",
            guests: 6,
            location: "Saint Helena Island",
            distance: "1 mi from city center",
            rating: 4.5,
            reviews: 31,
            price: 251,
            imageUrl: ["/images/image-1.jpg", "/images/image-2.jpg"],
        },
        {
            id: 3,
            name: "House in Saint Helena Island with Pool",
            roomNumber: 3,
            availableFrom: "2024-09-01",
            type: "House",
            size: "1680 ft²",
            guests: 6,
            location: "Saint Helena Island",
            distance: "1.2 mi from city center",
            rating: 5.0,
            reviews: 1,
            price: 239,
            imageUrl: ["/images/image-1.jpg", "/images/image-2.jpg"],
        },
        {
            id: 4,
            name: "Condo in Saint Helena Island with Indoor Pool + B...",
            roomNumber: 2,
            availableFrom: "2024-08-15",
            type: "Condo",
            size: "1500 ft²",
            guests: 6,
            location: "Saint Helena Island",
            distance: "1 mi from city center",
            rating: 4.5,
            reviews: 31,
            price: 251,
            imageUrl: ["/images/image-1.jpg", "/images/image-2.jpg"],
        },
        {
            id: 5,
            name: "House in Saint Helena Island with Pool",
            roomNumber: 3,
            availableFrom: "2024-09-01",
            type: "House",
            size: "1680 ft²",
            guests: 6,
            location: "Saint Helena Island",
            distance: "1.2 mi from city center",
            rating: 5.0,
            reviews: 1,
            price: 239,
            imageUrl: ["/images/image-1.jpg", "/images/image-2.jpg"],
        },
        {
            id: 6,
            name: "Condo in Saint Helena Island with Indoor Pool",
            roomNumber: 2,
            availableFrom: "2024-08-15",
            type: "Condo",
            size: "1500 ft²",
            guests: 6,
            location: "Saint Helena Island",
            distance: "1 mi from city center",
            rating: 4.5,
            reviews: 31,
            price: 251,
            imageUrl: ["/images/image-1.jpg", "/images/image-2.jpg"],
        },
    ];

    return properties;
}

export function convertArray(arrayOfObject1) {
    const propertyMap = {};

    arrayOfObject1.forEach(booking => {
        const {
            propertyID,
            propertyName,
            propertyAddress,
            propertyType,
            propertyRent,
            propertyDescription,
            propertySize,
            sizeUnit,
            propertyStatus,
            ...bookingDetails
        } = booking;

        if (!propertyMap[propertyID]) {
            propertyMap[propertyID] = {
                propertyID,
                propertyName,
                propertyAddress,
                propertyType,
                propertyRent,
                propertyDescription,
                propertySize,
                sizeUnit,
                propertyStatus,
                bookings: []
            };
        }

        propertyMap[propertyID].bookings.push(bookingDetails);
    });

    return Object.values(propertyMap);
}

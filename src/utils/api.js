export const domain = "http://localhost:5000";

export const Api = {
    GetPropertyList: (propertysize, numberofroom, maxRent) => `${domain}/property?propertysize=${propertysize ?? ""}&numberofroom=${numberofroom ?? ""}&maxRent=${maxRent ?? ""}`,
    GetProperty: (id) => `${domain}/property?propertyid=${id}`,
    CreateProperty: `${domain}/property`,
    CreateUser: `${domain}/api/user`,
    UpdateUser: `${domain}/api/user`,
    GetUser: (id) => `${domain}/api/users/${id}`,
    CreateBooking: `${domain}/api/book`,
    Login: `${domain}/api/login`,
    BookingList: (ownerid) => `${domain}/bookinginfo/${ownerid}`,
    MyBookings: (tenantId) => `${domain}/api/bookinginfotenant/${tenantId}`,
    BookingInfoForConfim: (bookingId) => `${domain}/bookinginginfoforconfirm/${bookingId}`,
    ConfirmBooking: `${domain}/api/book`
};

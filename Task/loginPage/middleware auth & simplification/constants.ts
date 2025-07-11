
export const NAV_Link = [
    { name: 'Destination', href: '/destination' },
    { name: 'HollidayTypes', href: '/hollidayTypes'},
    { name: 'SpecialOffers', href: '/specialOffers'},
    { name: 'Cruise', href: '/cruise'},
    { name: 'Admin Login', href: '/login'},
]

export const LOGGED_IN_ROUTES = [
    '/dashboard',
]

export const PUBLIC_ROUTES = [
    '/destination',
    '/hollydayTypes',
    '/specialOffers',
    '/cruise',
    '/',
] 

// export const ROUTE_REDIRECTS = [
//   { from: '/login', 
//     to: '/dashboard',
//     condition: 'authed' },
// ];

export const PAGE_HEAD = {
    page: 'Home',
    destination: 'Destination',
    hollidayTypes: 'Holliday Types',
    specialOffers: 'Special Offers',
    cruise: 'Cruise',
}

export const SEARCH_LABELS = {
    destination: 'Destination',
    flyFrom: 'Fly from',
    date: 'Date',
    duration: 'Duration',
    destinationPlaceholder: 'Enter destination',
    flyFromPlaceholder: 'Enter your type',
    datePlaceholder: 'Enter the date',
    durationPlaceholder: 'Enter the duration'
}

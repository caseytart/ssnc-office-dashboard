// SS&C Global Office Locations
// This data is cross-referenced with the Fulcrum "Users" app (office_location field 65d0)
// and the field_techs.xlsx spreadsheet for IT Field Support names.
//
// Each entry uses a locationMatchKeys array for flexible matching against Fulcrum's varying naming conventions.
// type: "on-site" = dedicated tech, "near-site" = within 2-4 hrs travel, "remote" = overnight/remote support
// parentId: links near-site/remote locations to their supporting on-site hub

const locationData = [
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    //           AMERICAS
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

    // --- Kansas City Hub ---
    { id: "KC-MO", region: "Americas", metroArea: "Kansas City", name: "Kansas City, MO", lat: 39.0997, lng: -94.5786, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["kansas city"] },

    // --- New York Locations ---
    { id: "NYC-TSQ", region: "Americas", metroArea: "New York", name: "New York - 4 Times Square", lat: 40.7561, lng: -73.9863, totalStaff: 0, itFieldSupport: 14, type: "on-site", parentId: null,
      locationMatchKeys: ["4 times square"] },
    { id: "NYC-3RD", region: "Americas", metroArea: "New York", name: "New York - 622 Third Avenue", lat: 40.7497, lng: -73.9754, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["622 third avenue"] },
    { id: "NY-HAR", region: "Americas", metroArea: "New York", name: "Harrison, NY", lat: 41.0261, lng: -73.7145, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "NYC-TSQ",
      locationMatchKeys: ["harrison ny"] },
    { id: "NY-YOR", region: "Americas", metroArea: "New York", name: "Yorktown Heights, NY", lat: 41.2762, lng: -73.7820, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "NYC-TSQ",
      locationMatchKeys: ["yorktown heights"] },
    { id: "NYC-OTH", region: "Americas", metroArea: "New York", name: "New York (Tri-State) - Remote", lat: 40.7128, lng: -74.0060, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["new york", "new york ny", "remote usnew york", "white plains"] },

    // --- New Jersey Locations ---
    { id: "NJ-UNN", region: "Americas", metroArea: "New York", name: "Union, NJ", lat: 40.6976, lng: -74.2632, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["union nj"] },
    { id: "NJ-SKL", region: "Americas", metroArea: "New York", name: "Skillman, NJ", lat: 40.4248, lng: -74.7046, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "NJ-UNN",
      locationMatchKeys: ["skillman nj"] },

    // --- Massachusetts Locations ---
    { id: "MA-BRN", region: "Americas", metroArea: "Boston", name: "Braintree, MA - 30 Braintree Hill Park", lat: 42.2223, lng: -71.0186, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["braintree"] },
    { id: "MA-WLT", region: "Americas", metroArea: "Boston", name: "Waltham, MA - 10 CityPoint", lat: 42.3962, lng: -71.2662, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["waltham"] },
    { id: "MA-BOS1", region: "Americas", metroArea: "Boston", name: "Boston, MA - One Post Office Square", lat: 42.3564, lng: -71.0553, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["boston ma - one post office"] },
    { id: "MA-BOS2", region: "Americas", metroArea: "Boston", name: "Boston, MA - Other", lat: 42.3584, lng: -71.0583, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "MA-BOS1",
      locationMatchKeys: ["boston"] },

    // --- Connecticut Locations ---
    { id: "CT-WIN", region: "Americas", metroArea: "Other / Regional", name: "Windsor, CT - 80 Lamberton Rd", lat: 41.8596, lng: -72.6681, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["windsor ct"] },
    { id: "CT-STM", region: "Americas", metroArea: "Other / Regional", name: "Stamford, CT - Three Harbor Landing", lat: 41.0428, lng: -73.5414, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "CT-WIN",
      locationMatchKeys: ["stamford", "newtown ct"] },

    // --- Jacksonville FL ---
    { id: "JAX-FL", region: "Americas", metroArea: "Other / Regional", name: "Jacksonville, FL", lat: 30.3322, lng: -81.6557, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["jacksonville fl"] },

    // --- San Francisco Hub ---
    { id: "SF-CA", region: "Americas", metroArea: "Other / Regional", name: "San Francisco, CA", lat: 37.7749, lng: -122.4194, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["san francisco ca", "sacramento ca", "los angeles ca"] },

    // --- Chicago ---
    { id: "CHI-IL", region: "Americas", metroArea: "Other / Regional", name: "Chicago, IL", lat: 41.8781, lng: -87.6298, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["chicago il"] },

    // --- Denver ---
    { id: "DEN-CO", region: "Americas", metroArea: "Other / Regional", name: "Denver, CO", lat: 39.7392, lng: -104.9903, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "KC-MO",
      locationMatchKeys: ["denver co"] },

    // --- Dallas / Fort Worth / San Antonio / Houston ---
    { id: "DAL-TX", region: "Americas", metroArea: "Dallas", name: "Texas - Remote", lat: 32.7767, lng: -96.7970, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["dallas tx", "fort worth tx", "san antonio tx", "houston", "remote ustexas"] },

    // --- Dublin OH ---
    { id: "DUB-OH", region: "Americas", metroArea: "Other / Regional", name: "Dublin, OH", lat: 40.0992, lng: -83.1141, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "KC-MO",
      locationMatchKeys: ["dublin oh"] },

    // --- Evansville IN ---
    { id: "EVN-IN", region: "Americas", metroArea: "Other / Regional", name: "Evansville, IN", lat: 37.9716, lng: -87.5711, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "KC-MO",
      locationMatchKeys: ["evansville in"] },

    // --- Edina MN ---
    { id: "EDN-MN", region: "Americas", metroArea: "Other / Regional", name: "Edina, MN", lat: 44.8897, lng: -93.3499, totalStaff: 0, itFieldSupport: 0, type: "remote", parentId: null,
      locationMatchKeys: ["edina mn"] },

    // --- Kaysville UT ---
    { id: "KAY-UT", region: "Americas", metroArea: "Other / Regional", name: "Kaysville, UT", lat: 41.0352, lng: -111.9385, totalStaff: 0, itFieldSupport: 0, type: "remote", parentId: null,
      locationMatchKeys: ["kaysville ut"] },

    // --- Atlanta ---
    { id: "ATL-GA", region: "Americas", metroArea: "Other / Regional", name: "Atlanta, GA", lat: 33.7490, lng: -84.3880, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "JAX-FL",
      locationMatchKeys: ["atlanta"] },

    // --- Coral Gables / Palm Beach ---
    { id: "SFL-FL", region: "Americas", metroArea: "Other / Regional", name: "South Florida", lat: 25.7490, lng: -80.2620, totalStaff: 0, itFieldSupport: 0, type: "remote", parentId: null,
      locationMatchKeys: ["coral gables fl", "palm beach gardens fl"] },

    // --- Bellevue WA ---
    { id: "BEL-WA", region: "Americas", metroArea: "Other / Regional", name: "Bellevue, WA", lat: 47.6101, lng: -122.2015, totalStaff: 0, itFieldSupport: 0, type: "remote", parentId: null,
      locationMatchKeys: ["bellevue wa"] },

    // --- Canada: Mississauga Hub ---
    { id: "MSS-CA", region: "Americas", metroArea: "Toronto", name: "Mississauga, Canada", lat: 43.5890, lng: -79.6441, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["mississauga canada"] },

    // --- Canada: Toronto Hubs ---
    { id: "TOR-FNT", region: "Americas", metroArea: "Toronto", name: "Toronto - Front Street", lat: 43.6450, lng: -79.3820, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "MSS-CA",
      locationMatchKeys: ["toronto canada - front street"] },
    { id: "TOR-ADL", region: "Americas", metroArea: "Toronto", name: "Toronto - Adelaide Street", lat: 43.6499, lng: -79.3768, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "MSS-CA",
      locationMatchKeys: ["toronto canada - 30 adelaide"] },
    { id: "TOR-OTH", region: "Americas", metroArea: "Toronto", name: "Toronto - Other", lat: 43.6532, lng: -79.3832, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "MSS-CA",
      locationMatchKeys: ["toronto canada"] },

    // --- Canada: Other ---
    { id: "CAN-OTH", region: "Americas", metroArea: "Remote User Group", name: "Canada - Remote", lat: 56.13, lng: -106.34, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["halifax canada", "kitchener canada", "montreal", "remote canada"] },

    // --- Latin America ---
    { id: "LATAM", region: "Americas", metroArea: "Remote User Group", name: "Latin America - Remote", lat: -15.0, lng: -60.0, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["sao paolo brazil", "mexico city", "chile", "cayman islands", "bermuda", "remote brazil", "remote mexico", "remote colombia", "remote argentina", "remote bermuda"] },

    // --- United States Generic Remote ---
    { id: "USA-REM", region: "Americas", metroArea: "Remote User Group", name: "United States - Remote", lat: 38.0000, lng: -97.0000, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["remote us", "usa", "loc0", "remote usa"] },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    //            EMEA
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

    // --- Essex UK Hub (SS&C House) ---
    { id: "ESX-UK", region: "EMEA", metroArea: "London", name: "Essex, UK - SS&C House", lat: 51.5416, lng: 0.7096, totalStaff: 0, itFieldSupport: 9, type: "on-site", parentId: null,
      locationMatchKeys: ["essex uk"] },

    // --- UK Locations ---
    { id: "UK-STR", region: "EMEA", metroArea: "Regional / Non-FUA", name: "Stirling, UK - Castle Business Park", lat: 56.1165, lng: -3.9369, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["stirling uk - castle business", "stirling", "remote scotland"] },

    // --- London Locations ---
    { id: "LDN-ROP", region: "EMEA", metroArea: "London", name: "London - 1 Ropemaker Street", lat: 51.5192, lng: -0.0886, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["1 ropemaker street"] },
    { id: "LDN-BIR", region: "EMEA", metroArea: "London", name: "London - 20 Birchin Lane", lat: 51.5134, lng: -0.0858, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["20 birchin lane"] },
    { id: "LDN-QUE", region: "EMEA", metroArea: "London", name: "London - 62-64 Queen Street", lat: 51.5126, lng: -0.0931, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "LDN-ROP",
      locationMatchKeys: ["62-64 queen street"] },
    { id: "LDN-VIC", region: "EMEA", metroArea: "London", name: "London - Queen Victoria", lat: 51.5120, lng: -0.1011, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "LDN-ROP",
      locationMatchKeys: ["queen victoria street 128"] },
    { id: "LDN-OTH", region: "EMEA", metroArea: "London", name: "Greater London / South - Remote", lat: 51.5074, lng: -0.1278, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["london", "london uk"] },

    // --- Belfast ---
    { id: "BEL-UK", region: "EMEA", metroArea: "Belfast", name: "Belfast, UK", lat: 54.5973, lng: -5.9301, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "ESX-UK",
      locationMatchKeys: ["belfast"] },

    // --- Bristol UK ---
    { id: "BRI-UK", region: "EMEA", metroArea: "London", name: "Bristol, UK", lat: 51.4545, lng: -2.5879, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "ESX-UK",
      locationMatchKeys: ["bristol uk"] },

    // --- Surrey UK ---
    { id: "SUR-UK", region: "EMEA", metroArea: "London", name: "Surrey, UK", lat: 51.3148, lng: -0.5600, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "ESX-UK",
      locationMatchKeys: ["surrey uk"] },

    // --- Bolton UK ---
    { id: "BOL-UK", region: "EMEA", metroArea: "Regional / Non-FUA", name: "Bolton, UK", lat: 53.5783, lng: -2.4299, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "ESX-UK",
      locationMatchKeys: ["bolton uk", "burnley uk", "lichfield uk", "warrington uk", "bracknell uk", "birmingham uk"] },

    // --- Remote UK ---
    { id: "REM-UK", region: "EMEA", metroArea: "Remote User Group", name: "United Kingdom - Remote", lat: 52.4862, lng: -1.8904, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["remote uk", "remote northern ireland"] },

    // --- Ireland Locations ---
    { id: "IE-DUB1", region: "EMEA", metroArea: "Dublin", name: "Dublin, Ireland - Bishop's Square", lat: 53.3391, lng: -6.2655, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["dublin ireland - bishop", "dublin ireland", "remote ireland"] },

    // --- Luxembourg ---
    { id: "LUX", region: "EMEA", metroArea: "Luxembourg", name: "Luxembourg", lat: 49.6117, lng: 6.1319, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["luxembourg"] },

    // --- Romania ---
    { id: "ROM", region: "EMEA", metroArea: "Remote User Group", name: "Romania - Remote", lat: 44.4268, lng: 26.1025, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["bucharest romania", "remote romania"] },

    // --- Copenhagen ---
    { id: "CPH-DK", region: "EMEA", metroArea: "Copenhagen", name: "Copenhagen, Denmark", lat: 55.6811, lng: 12.5800, totalStaff: 0, itFieldSupport: 0, type: "remote", parentId: null,
      locationMatchKeys: ["copenhagen - pilestrde 6", "copenhagen denmark"] },

    // --- Oslo ---
    { id: "OSL-NO", region: "EMEA", metroArea: "Oslo", name: "Oslo, Norway", lat: 59.9139, lng: 10.7522, totalStaff: 0, itFieldSupport: 0, type: "remote", parentId: null,
      locationMatchKeys: ["oslo norway"] },

    // --- Continental Europe ---
    { id: "EUR-OTH", region: "EMEA", metroArea: "Remote User Group", name: "Continental Europe - Remote", lat: 50.0, lng: 10.0, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["paris france", "remote france", "frankfurt germany", "remote germany", "stockholm sweden", "remote sweden",
        "vienna", "remote austria", "remote italy", "milan", "remote spain", "madrid spain",
        "zurich", "remote switzerland", "remote poland", "remote greece", "remote turkey", "remote ukraine", "remote israel", "remote estonia", "remote portugal", "remote netherlands"] },

    // --- Middle East & Africa ---
    { id: "MEA", region: "EMEA", metroArea: "Remote User Group", name: "Middle East & Africa - Remote", lat: 15.0, lng: 30.0, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["dubai uae", "abu dhabi uae", "remote united arab emirates", "remote saudi arabia", "johannesburg", "bellville", "south africa",
        "remote south africa", "remote egypt"] },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    //            INDIA
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

    // --- Mumbai Hubs ---
    { id: "MUM-AIR", region: "India", metroArea: "Mumbai", name: "Mumbai - Airoli", lat: 19.1558, lng: 72.9965, totalStaff: 0, itFieldSupport: 22, type: "on-site", parentId: null,
      locationMatchKeys: ["mumbai india - airoli", "remote airoli"] },
    { id: "MUM-AIR3", region: "India", metroArea: "Mumbai", name: "Mumbai - Airoli 3", lat: 19.1565, lng: 72.9950, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["mumbai india - airoli 3"] },
    { id: "MUM-NIR", region: "India", metroArea: "Mumbai", name: "Mumbai - Nirlon (NKP)", lat: 19.1627, lng: 72.8550, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["mumbai india - nirlon"] },
    { id: "MUM-MAL", region: "India", metroArea: "Mumbai", name: "Mumbai - Malad", lat: 19.1834, lng: 72.8398, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["mumbai india - malad"] },
    { id: "MUM-BKC", region: "India", metroArea: "Mumbai", name: "Mumbai - WeWork BKC", lat: 19.0664, lng: 72.8631, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["mumbai india - wework bkc"] },

    // --- Hyderabad Hub ---
    { id: "HYD-IN", region: "India", metroArea: "Hyderabad", name: "Hyderabad, India", lat: 17.3850, lng: 78.4867, totalStaff: 0, itFieldSupport: 6, type: "on-site", parentId: null,
      locationMatchKeys: ["hyderabad india", "remote hyderabad"] },

    // --- Pune Hub ---
    { id: "PUN-COM", region: "India", metroArea: "Pune", name: "Pune, India - Commerzone Building 7", lat: 18.5524, lng: 73.8967, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["pune india - commerzone", "pune india", "remote pune"] },

    // --- Thane ---
    { id: "THA-IN", region: "India", metroArea: "Mumbai", name: "Thane, India", lat: 19.2183, lng: 72.9781, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "MUM-AIR",
      locationMatchKeys: ["thane india"] },

    // --- Gurgaon / Gurugram ---
    { id: "GUR-IN", region: "India", metroArea: "Hyderabad", name: "Gurgaon, India", lat: 28.4595, lng: 77.0266, totalStaff: 0, itFieldSupport: 0, type: "near-site", parentId: "HYD-IN",
      locationMatchKeys: ["gurgaon india", "gurugram india"] },

    // --- Gujarat / GIFT City ---
    { id: "GUJ-IN", region: "India", metroArea: "Remote User Group", name: "GIFT City - Remote", lat: 23.1570, lng: 72.6681, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["india - gift city", "remote india", "remote karnataka", "bangalore", "bengaluru"] },

    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
    //            APAC
    // â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

    // --- Australia Locations ---
    { id: "AU-MLB1", region: "APAC", metroArea: "Melbourne", name: "Melbourne - 800 Bourke Street", lat: -37.8183, lng: 144.9455, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["melbourne - 800 bourke"] },
    { id: "AU-MLB2", region: "APAC", metroArea: "Melbourne", name: "Melbourne - Other", lat: -37.8136, lng: 144.9631, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["melbourne"] },
    { id: "AU-SYD1", region: "APAC", metroArea: "Sydney", name: "Sydney - 255 George Street", lat: -33.8631, lng: 151.2069, totalStaff: 0, itFieldSupport: 4, type: "on-site", parentId: null,
      locationMatchKeys: ["sydney - 255 george"] },
    { id: "AU-SYD2", region: "APAC", metroArea: "Sydney", name: "Sydney - Other", lat: -33.8688, lng: 151.2093, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["sydney", "castlereagh", "lime street"] },
    { id: "AU-PRM1", region: "APAC", metroArea: "Sydney", name: "Parramatta - 3 Parramatta Sq", lat: -33.8150, lng: 151.0011, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["parramatta", "newcastle west", "remote new south wales"] },

    // --- Australia: Murarrie ---
    { id: "AU-MUR", region: "APAC", metroArea: "Brisbane", name: "Murarrie, Australia", lat: -27.4608, lng: 153.1011, totalStaff: 0, itFieldSupport: 0, type: "remote", parentId: null,
      locationMatchKeys: ["murarrie australia"] },

    // --- Australia Other ---
    { id: "AU-OTH", region: "APAC", metroArea: "Remote User Group", name: "Australia - Remote", lat: -25.0, lng: 133.0, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["brisbane", "wollongong", "hobart", "remote victoria", "remote queensland"] },

    // --- Singapore Hub ---
    { id: "SIN-RQ", region: "APAC", metroArea: "Regional / Non-FUA", name: "Singapore - 1 Raffles Quay", lat: 1.2814, lng: 103.8519, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["singapore - 1 raffles", "singapore", "remote philippines"] },

    // --- Thailand ---
    { id: "BKK-TH", region: "APAC", metroArea: "Regional / Non-FUA", name: "Thailand", lat: 13.7563, lng: 100.5018, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["bangkok thailand", "remote thailand", "kuala lumpur malaysia"] },

    // --- Hong Kong ---
    { id: "HK", region: "APAC", metroArea: "Regional / Non-FUA", name: "Hong Kong", lat: 22.3193, lng: 114.1694, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["hong kong", "remote hong kong"] },

    // --- Japan ---
    { id: "TYO-JP", region: "APAC", metroArea: "Tokyo", name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, totalStaff: 0, itFieldSupport: 0, type: "on-site", parentId: null,
      locationMatchKeys: ["tokyo", "remote japan"] },

    // --- China ---
    { id: "CHN", region: "APAC", metroArea: "Remote User Group", name: "China - Remote", lat: 35.86, lng: 104.19, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["shanghai china", "remote shanghai china", "remote beijing china", "beijing"] },

    // --- Pakistan ---
    { id: "PAK", region: "APAC", metroArea: "Remote User Group", name: "Pakistan - Remote", lat: 30.37, lng: 69.34, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["karachi", "remote pakistan"] },

    // --- Other APAC ---
    { id: "APAC-OTH", region: "APAC", metroArea: "Remote User Group", name: "APAC - Remote", lat: 0.0, lng: 120.0, totalStaff: 0, itFieldSupport: 0, type: "pure-remote", parentId: null,
      locationMatchKeys: ["remote korea", "remote taiwan", "remote indonesia"] }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Map
    // Dark themed map tiles (CartoDB Dark Matter)
    const maxBounds = L.latLngBounds([[-90, -180], [90, 180]]);
    const map = L.map('map', {
        zoomControl: false, // Put zoom elsewhere
        maxBounds: maxBounds,
        maxBoundsViscosity: 1.0,
        minZoom: 2,
        zoomSnap: 0.1, // Allow fractional zooms to perfectly fit bounding boxes
        zoomDelta: 0.5

    }).setView([39.8283, -98.5795], 4); // Center of US as default

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // CartoDB Dark Matter for dark, CartoDB Voyager for atlas-like light theme map
    const darkTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    const lightTileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const getSystemTheme = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    let currentTheme = localStorage.getItem('map-theme') || getSystemTheme();
    
    document.documentElement.setAttribute('data-theme', currentTheme);

    const tileLayer = L.tileLayer(currentTheme === 'dark' ? darkTileUrl : lightTileUrl, {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    const themeToggleBtn = document.getElementById('theme-toggle');
    const updateThemeIcon = () => {
        if(themeToggleBtn) {
            if(currentTheme === 'dark') {
                themeToggleBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg><span style="font-size: 13px; font-weight: 500; font-family: \'Inter\', sans-serif;">Light Mode</span>'; 
            } else {
                themeToggleBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg><span style="font-size: 13px; font-weight: 500; font-family: \'Inter\', sans-serif;">Dark Mode</span>'; 
            }
        }
    };
    updateThemeIcon();

    themeToggleBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('map-theme', currentTheme);
        tileLayer.setUrl(currentTheme === 'dark' ? darkTileUrl : lightTileUrl);
        updateThemeIcon();
    });

    // Swap tiles live if system theme changes (if no manual override is active)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if(!localStorage.getItem('map-theme')) {
            currentTheme = event.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
            tileLayer.setUrl(currentTheme === 'dark' ? darkTileUrl : lightTileUrl);
            updateThemeIcon();
        }
    });

    // --- UI Visibility Toggle Logic ---
    const uiToggleBtn = document.getElementById('ui-visibility-toggle');
    const toggleUI = () => {
        const isHidden = document.body.classList.toggle('ui-hidden');
        if (uiToggleBtn) {
            uiToggleBtn.classList.toggle('active', isHidden);
            
            // Update SVG icon and text based on state
            if (isHidden) {
                uiToggleBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg><span style="font-size: 13px; font-weight: 500; font-family: \'Inter\', sans-serif;">Show UI</span>';
            } else {
                uiToggleBtn.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg><span style="font-size: 13px; font-weight: 500; font-family: \'Inter\', sans-serif;">Clean View (H)</span>';
            }
        }
    };

    if (uiToggleBtn) {
        uiToggleBtn.addEventListener('click', toggleUI);
    }

    // --- Quick Region & Focus Logic ---
    window.snapToActiveExtent = (isManual = false) => {
        const activeLocs = window.allLocationsData ? window.allLocationsData.filter(l => l.filteredStaff > 0) : [];
        const filtersApplied = window.globalFilters.executive !== 'All' || window.globalFilters.region !== 'All' || window.globalFilters.metroArea !== 'All' || window.globalFilters.coverageModel !== 'All';

        if (activeLocs.length > 0) {
            let bounds;
            if (filtersApplied || isManual) {
                const lats = activeLocs.map(l => l.lat);
                const lngs = activeLocs.map(l => l.lng);
                bounds = L.latLngBounds([
                    [Math.min(...lats), Math.min(...lngs)],
                    [Math.max(...lats), Math.max(...lngs)]
                ]);
            } else {
                // Hardcoded Global bounds for baseline
                bounds = L.latLngBounds([[-55, -130], [65, 155]]);
            }
            
            if (isManual) {
                map.flyToBounds(bounds, { padding: [30, 30], duration: 1.5 });
            } else {
                map.fitBounds(bounds, { padding: [30, 30], animate: true });
            }
        }
    };

    // Quick Region Panning
    const regionBounds = {
        'Global': [[-55, -130], [65, 155]],
        'Americas': [[-40, -130], [65, -45]],
        'EMEA': [[-35, -20], [65, 55]],
        'APAC': [[-45, 65], [50, 175]]
    };

    document.querySelectorAll('.quick-region-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const region = e.target.getAttribute('data-region');
            if (regionBounds[region]) {
                const bounds = L.latLngBounds(regionBounds[region]);
                map.flyToBounds(bounds, { padding: [20, 20], duration: 1.5 });
            }
        });
    });

    // Add keyboard shortcut 'H' for hide and 'F' for focus
    document.addEventListener('keydown', (e) => {
        const char = e.key.toLowerCase();
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
        
        if (char === 'h') {
            toggleUI();
        } else if (char === 'f') {
            window.snapToActiveExtent(true);
        }
    });

    // 2. Data processing
    let locationsById = {};
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');
    const sidebarContent = document.getElementById('sidebar-content');

    // --- Global Dashboard Variables ---
    window.globalFilters = {
        executive: 'All',
        region: 'All',
        metroArea: 'All',
        coverageModel: 'All'
    };
    window.allExecutives = new Set();
    window.regionMetroMap = {};

    const initDataAndDraw = async () => {
        window.allLocationsData = locationData; // Make accessible globally for Focus Snap
        try {
            // Prepare arrays and mappings for all locations
            locationData.forEach(l => {
                l.totalStaff = 0;
                l.demographicUsers = [];
                
                // Build Region/Metro Map for Dropdowns
                if (l.region) {
                    if (!window.regionMetroMap[l.region]) window.regionMetroMap[l.region] = new Set();
                    if (l.metroArea) window.regionMetroMap[l.region].add(l.metroArea);
                }
            });

            // Try lean format first (office_data.json ~1.7MB), fall back to full fulcrum.json (~121MB)
            let records = null;
            let isLeanFormat = false;

            const leanRes = await fetch('office_data.json').catch(() => null);
            if (leanRes && leanRes.ok) {
                const leanData = await leanRes.json();
                records = leanData.records;
                isLeanFormat = true;
                console.log(`Loaded lean office_data.json: ${records.length} records (generated: ${leanData.generated_at || 'unknown'})`);
            } else {
                const fulcrumRes = await fetch('fulcrum.json').catch(() => null);
                if (fulcrumRes && fulcrumRes.ok) {
                    const fulcrumData = await fulcrumRes.json();
                    records = fulcrumData.records;
                    isLeanFormat = false;
                    console.log(`Loaded legacy fulcrum.json: ${records.length} records`);
                }
            }

            if (records) {
                let unmatchedLocs = {};
                records.forEach(r => {
                    // Extract office location and executive based on format
                    let officeLoc, exec;

                    if (isLeanFormat) {
                        // Lean format: { loc: "...", exec: "..." }
                        officeLoc = r.loc;
                        exec = r.exec || 'Unknown';
                    } else {
                        // Full Fulcrum format: { status, form_values: { 65d0, 49d8 } }
                        const status = (r.status || '').toLowerCase();
                        if (status !== 'active') return;
                        officeLoc = r.form_values['65d0'];
                        exec = r.form_values['49d8'];
                        if (exec && typeof exec === 'object' && exec.choice_values) exec = exec.choice_values[0];
                        exec = exec ? String(exec).trim() : 'Unknown';
                    }

                    if (officeLoc) {
                        const officeLower = officeLoc.toLowerCase();
                        const match = locationData.find(l => {
                            if (l.locationMatchKeys) {
                                return l.locationMatchKeys.some(key => officeLower.includes(key));
                            }
                            return false;
                        });
                        
                        if (match) {
                            match.totalStaff += 1;
                            window.allExecutives.add(exec);
                            match.demographicUsers.push({ exec });
                        } else {
                            unmatchedLocs[officeLoc] = (unmatchedLocs[officeLoc] || 0) + 1;
                        }
                    }
                });
                console.log(`Mapped live headcounts from ${records.length} user records!`);
                if (Object.keys(unmatchedLocs).length > 0) {
                    console.warn("Unmatched locations:", unmatchedLocs);
                }
            }
        } catch(e) {
            console.warn("User data not loaded. Using default fallback counts.", e);
        }

        try {
            // Attempt to load field_techs.xlsx through network fetch
            const response = await fetch('field_techs.xlsx');
            if (response.ok) {
                const arrayBuffer = await response.arrayBuffer();
                const workbook = window.XLSX.read(arrayBuffer, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = window.XLSX.utils.sheet_to_json(worksheet, { defval: "" });

                // Cross-reference data and merge IT Support metrics dynamically
                jsonData.forEach(row => {
                    const keys = Object.keys(row);
                    const locKey = keys.find(k => k.toLowerCase().includes('location') || k.toLowerCase().includes('office'));
                    const techKey = keys.find(k => k.toLowerCase().includes('tech'));

                    if (!locKey || !techKey) return;
                    
                    const locName = row[locKey];
                    const techData = row[techKey];
                    
                    if (locName && techData !== undefined && techData !== "") {
                        // Find matching location using multiple heuristic layers
                        const targetLoc = locationData.find(l => {
                            const nameLower = l.name.toLowerCase();
                            const techLower = locName.toString().toLowerCase();
                            
                            // Exact substring check
                            if (nameLower.includes(techLower) || techLower.includes(nameLower)) return true;
                            
                            // Checking locationMatchKeys handles generic names (e.g. "Boston" matching "Boston, MA - One Post Office Square")
                            if (l.locationMatchKeys && l.locationMatchKeys.some(key => techLower.includes(key))) return true;
                            
                            return false;
                        });

                        if (targetLoc) {
                            let count = 0;
                            let rawNames = [];
                            if (typeof techData === 'number') {
                                count = techData;
                            } else if (typeof techData === 'string') {
                                // Extract the comma separated names
                                const names = techData.split(',').map(n => n.trim()).filter(n => n.length > 0);
                                if(names.length === 1 && !isNaN(parseInt(names[0]))) {
                                    count = parseInt(names[0], 10);
                                } else {
                                    count = names.length;
                                    rawNames = names;
                                }
                            }
                            targetLoc.itFieldSupport = count;
                            targetLoc.fieldTechNames = rawNames;
                        }
                    }
                });
            }
        } catch (e) {
            console.warn("Could not fetch field_techs.xlsx locally, using default mock counts.", e);
        }

        // Calculate sizing ranges for the markers
        const maxStaff = Math.max(...locationData.map(l => l.totalStaff));
        const minStaff = Math.min(...locationData.map(l => l.totalStaff));

        // Maps parent connections
        locationData.forEach(loc => { locationsById[loc.id] = loc; });

        // Layer group for polylines so we can redraw them
        const polylineLayer = L.layerGroup().addTo(map);
        const metroLayer = L.layerGroup().addTo(map);

        // --- Metro Solar Flare Animation Logic ---
        const updateMetroFlares = () => {
            metroLayer.clearLayers();
            const zoom = map.getZoom();
            
            // Only show flares when zoomed out enough for markers to overlap (Subtle threshold)
            if (zoom > 7) return;

            // Group active physical locations by metroArea (excluding Remote User Groups)
            const activeLocs = locationData.filter(l => l.filteredStaff > 0 && l.type !== 'pure-remote' && l.metroArea !== 'Regional / Non-FUA' && l.metroArea !== 'Remote User Group' && l.metroArea !== 'Other / Regional');
            const metroGroups = {};
            
            activeLocs.forEach(loc => {
                if (!metroGroups[loc.metroArea]) metroGroups[loc.metroArea] = [];
                metroGroups[loc.metroArea].push(loc);
            });

            Object.entries(metroGroups).forEach(([metroName, locs]) => {
                if (locs.length <= 1) return;

                // Hub is preferably on-site
                let hub = locs.find(l => l.type === 'on-site') || locs[0];
                
                // Add a subtle pulsing halo behind the hub
                const haloIcon = L.divIcon({
                    className: 'metro-halo',
                    iconSize: [40, 40],
                    iconAnchor: [20, 20]
                });
                L.marker([hub.lat, hub.lng], { icon: haloIcon, interactive: false }).addTo(metroLayer);

                // Draw subtle flare lines to other members
                locs.forEach(loc => {
                    if (loc.id === hub.id) return;
                    
                    L.polyline([[hub.lat, hub.lng], [loc.lat, loc.lng]], {
                        color: 'rgba(255, 215, 0, 0.25)',
                        weight: 1,
                        opacity: 0.2,
                        dashArray: '4, 8',
                        className: 'metro-flare-line'
                    }).addTo(metroLayer);
                });
            });
        };

        // Make updateMetroFlares accessible
        window.updateMetroFlares = updateMetroFlares;
        map.on('zoomend', updateMetroFlares);

        // Function to draw all connection polylines
        const drawPolylines = () => {
            polylineLayer.clearLayers();
            locationData.forEach(loc => {
                if (loc.parentId && locationsById[loc.parentId]) {
                    const parent = locationsById[loc.parentId];
                    
                    L.polyline([[loc.lat, loc.lng], [parent.lat, parent.lng]], {
                        color: '#ef4444',
                        weight: 2,
                        opacity: 0.4,
                        dashArray: '5, 5'
                    }).addTo(polylineLayer);
                }
            });
        };

        // Make drawPolylines accessible from edit panel
        window.redrawPolylines = drawPolylines;

        // Attach listeners to hardcoded legend
        const createLegend = () => {
            const legendDiv = document.getElementById('legend-container');
            if (!legendDiv) return;
            
            // Add Interactivity to existing items in index.html
            legendDiv.querySelectorAll('.legend-item').forEach(item => {
                const type = item.dataset.type;

                // Hover Preview Effect
                item.addEventListener('mouseenter', () => {
                    locationData.forEach(loc => {
                        if (loc.type === type && loc.filteredStaff > 0) {
                            const marker = markersById[loc.id];
                            if (marker && marker.getElement()) {
                                marker.getElement().querySelector('.custom-marker-inner').classList.add('legend-hover-preview');
                            }
                        }
                    });
                });

                item.addEventListener('mouseleave', () => {
                    document.querySelectorAll('.legend-hover-preview').forEach(el => el.classList.remove('legend-hover-preview'));
                });

                // Click to Filter
                item.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Reset all legend items
                    legendDiv.querySelectorAll('.legend-item').forEach(i => i.classList.remove('active'));
                    
                    if (isActive) {
                        window.globalFilters.coverageModel = 'All';
                    } else {
                        item.classList.add('active');
                        window.globalFilters.coverageModel = type;
                    }
                    
                    window.recalculateMetricsAndMap();
                });
            });
        };

        // Map of loc.id -> Leaflet marker, so we can update icons after edits
        const markersById = {};

        // Helper: derive CSS class from coverage type
        const typeToClass = (type) => {
            if (type === 'on-site') return 'type-onsite';
            if (type === 'near-site') return 'type-nearsite';
            if (type === 'pure-remote') return 'type-pure-remote';
            return 'type-remote';
        };

        // Redraw a single marker's icon to match its current type & update tooltip
        const redrawMarker = (loc) => {
            const marker = markersById[loc.id];
            if (!marker) return;
            const typeClass = typeToClass(loc.type);
            // Replace the inner div's class in-place (avoids full icon rebuild)
            const el = marker.getElement();
            if (el) {
                const inner = el.querySelector('.custom-marker-inner');
                if (inner) {
                    inner.className = `custom-marker-inner ${typeClass}`;
                }
            }
            // Also update the tooltip text
            marker.setTooltipContent(`<b>${loc.name}</b><br>${loc.totalStaff} users`);
        };

        // Expose globally so the edit panel save handler can call it
        window.redrawMarker = redrawMarker;

        // Setup MarkerClustering
        const markerCluster = L.markerClusterGroup({
            maxClusterRadius: 40,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            iconCreateFunction: function (cluster) {
                const childCount = cluster.getChildCount();
                const children = cluster.getAllChildMarkers();
                
                let clusterUsers = 0;
                let clusterTechs = 0;

                children.forEach(m => {
                    if (m.options && m.options.locData) {
                        clusterUsers += (m.options.locData.filteredStaff || 0);
                        clusterTechs += (m.options.locData.itFieldSupport || 0);
                    }
                });

                if (clusterUsers === 0) {
                    return L.divIcon({ html: '<div style="display:none;"></div>', className: 'hidden-cluster' });
                }

                // Size scaling for clusters based on aggregated users
                let size = 36;
                if (clusterUsers > 500) size = 44;
                if (clusterUsers > 2000) size = 52;
                if (clusterUsers > 10000) size = 60;
                
                const techHtml = clusterTechs > 0 ? `<div class="cluster-techs">${clusterTechs} Techs</div>` : '';

                return L.divIcon({ 
                    html: `
                        <div class="cluster-content">
                            <div class="cluster-users">${clusterUsers.toLocaleString()}</div>
                            ${techHtml}
                        </div>
                    `, 
                    className: 'custom-cluster-icon', 
                    iconSize: L.point(size, size) 
                });
            }
        });
        map.addLayer(markerCluster);

        // Loop through locations to instantiate baseline markers
        locationData.forEach(loc => {
            // Give it a generic icon initially, will be resized
            const customIcon = L.divIcon({
                className: 'custom-leaflet-marker-wrapper',
                iconSize: [16, 16],
                iconAnchor: [8, 8],
                html: `<div class="custom-marker-inner ${typeToClass(loc.type)}"></div>`
            });

            // Store locData in options so the cluster can read it
            const marker = L.marker([loc.lat, loc.lng], { icon: customIcon, locData: loc });
            markerCluster.addLayer(marker);
            
            // Initial Tooltip (will be replaced)
            marker.bindTooltip(`<b>${loc.name}</b>`);
            markersById[loc.id] = marker;

            marker.on('click', () => {
                selectLocation(loc);
            });
        });

        // Initialize Legend after markers are ready
        createLegend();

        // --- DASHBOARD & METRICS ENGINE ---
        window.recalculateMetricsAndMap = () => {
            const filterExec = window.globalFilters.executive;
            const filterRegion = window.globalFilters.region;
            const filterMetro = window.globalFilters.metroArea;
            const filterCoverage = window.globalFilters.coverageModel;

            let activeUsers = 0;
            let globalTechs = 0;
            
            // Phase 1: Filter locations and aggregate math
            locationData.forEach(loc => {
                // 1. Geographic Pass
                const passRegion = (filterRegion === 'All' || loc.region === filterRegion);
                const passMetro = (filterMetro === 'All' || loc.metroArea === filterMetro);
                const passCoverage = (filterCoverage === 'All' || loc.type === filterCoverage);

                if (!passRegion || !passMetro || !passCoverage) {
                    loc.filteredStaff = 0;
                } else {
                    // 2. Executive Pass
                    if (filterExec === 'All') {
                        loc.filteredStaff = loc.totalStaff;
                    } else {
                        loc.filteredStaff = loc.demographicUsers.filter(u => u.exec === filterExec).length;
                    }
                }
                
                activeUsers += loc.filteredStaff;
                
                // 3. Proportional Tech Tally (only add field techs for buildings visually active)
                if (loc.filteredStaff > 0) {
                    globalTechs += (loc.itFieldSupport || 0);
                }
            });

            // Phase 2: Sizing Scale
            const activeLocs = locationData.filter(l => l.filteredStaff > 0);
            let activeMax = 1;
            let activeMin = 0;
            if (activeLocs.length > 0) {
                activeMax = Math.max(...activeLocs.map(l => l.filteredStaff));
                activeMin = Math.min(...activeLocs.map(l => l.filteredStaff));
            }

            // Phase 3: Resize Map Nodes
            locationData.forEach(loc => {
                const marker = markersById[loc.id];
                if (!marker) return;

                if (loc.filteredStaff === 0 && (filterExec !== 'All' || filterRegion !== 'All' || filterMetro !== 'All')) {
                    const size = 6;
                    const customIcon = L.divIcon({
                        className: 'custom-leaflet-marker-wrapper',
                        iconSize: [size, size],
                        iconAnchor: [size/2, size/2],
                        html: `<div class="custom-marker-inner ${typeToClass(loc.type)}" style="opacity: 0.3;"></div>`
                    });
                    marker.setIcon(customIcon);
                    marker.setTooltipContent(`<b>${loc.name}</b><br>Filtered out`);
                } else {
                    // Marker size scaling logic
                    const minSize = 18;
                    const maxSize = 70;
                    let scale = 0;
                    if (activeMax !== activeMin && activeMax > 0) {
                        // Using pow(0.35) for a more aggressive log-like curve that boosts the 500-2,000 user range
                        // while slowing down the growth for massive outlier hubs.
                        scale = (Math.pow(loc.filteredStaff, 0.35) - Math.pow(activeMin, 0.35)) / (Math.pow(activeMax, 0.35) - Math.pow(activeMin, 0.35));
                        if (scale < 0) scale = 0;
                    }
                    const size = minSize + scale * (maxSize - minSize);
                    
                    const customIcon = L.divIcon({
                        className: 'custom-leaflet-marker-wrapper',
                        iconSize: [size, size],
                        iconAnchor: [size/2, size/2],
                        html: `<div class="custom-marker-inner ${typeToClass(loc.type)}"></div>`
                    });
                    marker.setIcon(customIcon);
                    
                    const techRow = (loc.itFieldSupport || 0) > 0 ? 
                        `<tr><td>Field Techs:</td><td style="text-align:right; font-weight:600; color:var(--color-nearsite);">${loc.itFieldSupport}</td></tr>` : '';
                    
                    const tooltipHtml = `
                        <div style="font-family: 'Inter', sans-serif; min-width: 140px;">
                            <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 4px; margin-bottom: 4px; font-weight: 600;">${loc.name}</div>
                            <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
                                <tr><td>Active Users:</td><td style="text-align:right; font-weight:600;">${loc.filteredStaff.toLocaleString()}</td></tr>
                                ${techRow}
                            </table>
                        </div>
                    `;
                    marker.setTooltipContent(tooltipHtml);
                }
            });

            // Trigger MarkerCluster to recalculate aggregation icons given new locData sizes
            markerCluster.refreshClusters();

            // Phase 4: Update Dashboard UI
            const elUsers = document.getElementById('metric-total-users');
            const elTechs = document.getElementById('metric-total-techs');
            const elRatio = document.getElementById('metric-ratio');
            
            if(elUsers) elUsers.innerText = activeUsers.toLocaleString();
            if(elTechs) elTechs.innerText = globalTechs.toLocaleString();
            
            if(elRatio) {
                if (globalTechs === 0) {
                    elRatio.innerText = "N/A";
                } else {
                    const ratio = Math.round(activeUsers / globalTechs);
                    elRatio.innerText = `1 : ${ratio}`;
                }
            }

            // Phase 5: Redraw Connecting Lines & Metro Flares
            drawPolylines();
            updateMetroFlares();
            
            // Phase 6: Auto-center and zoom map
            const filtersApplied = filterExec !== 'All' || filterRegion !== 'All' || filterMetro !== 'All' || filterCoverage !== 'All';
            const clearBtn = document.getElementById('clear-filters-btn');
            if (clearBtn) clearBtn.style.display = filtersApplied ? 'block' : 'none';

            window.snapToActiveExtent(false); 
        };

        // Populate Executive Filter Dropdown
        const execSelect = document.getElementById('exec-global-filter');
        if (execSelect) {
            const sortedExecs = Array.from(window.allExecutives).sort();
            execSelect.innerHTML = `<option value="All">All Executives (Total Users)</option>` + 
                sortedExecs.map(bu => `<option value="${bu}">${bu}</option>`).join('');

            execSelect.addEventListener('change', (e) => {
                window.globalFilters.executive = e.target.value;
                window.recalculateMetricsAndMap();
            });
        }

        // Populate Geographic Filters
        const regionSelect = document.getElementById('region-global-filter');
        const metroSelect = document.getElementById('metro-global-filter');
        
        if (regionSelect && metroSelect) {
            const sortedRegions = Object.keys(window.regionMetroMap).sort();
            regionSelect.innerHTML = `<option value="All">All Regions</option>` +
                sortedRegions.map(r => `<option value="${r}">${r}</option>`).join('');

            regionSelect.addEventListener('change', (e) => {
                const reg = e.target.value;
                window.globalFilters.region = reg;
                
                if (reg === 'All') {
                    metroSelect.innerHTML = `<option value="All">Any Metro Area</option>`;
                    metroSelect.disabled = true;
                    window.globalFilters.metroArea = 'All';
                } else {
                    metroSelect.disabled = false;
                    const sortedMetros = Array.from(window.regionMetroMap[reg]).sort();
                    metroSelect.innerHTML = `<option value="All">Any Metro Area</option>` +
                        sortedMetros.map(m => `<option value="${m}">${m}</option>`).join('');
                    window.globalFilters.metroArea = 'All';
                }
                window.recalculateMetricsAndMap();
            });
            
            metroSelect.addEventListener('change', (e) => {
                window.globalFilters.metroArea = e.target.value;
                window.recalculateMetricsAndMap();
            });

            // Clear All Filters Button
            const clearBtn = document.getElementById('clear-filters-btn');
            if (clearBtn) {
                clearBtn.addEventListener('click', () => {
                    const execSelect = document.getElementById('exec-global-filter');
                    if (execSelect) execSelect.value = 'All';
                    regionSelect.value = 'All';
                    metroSelect.innerHTML = `<option value="All">Any Metro Area</option>`;
                    metroSelect.disabled = true;
                    
                    window.globalFilters = { executive: 'All', region: 'All', metroArea: 'All', coverageModel: 'All' };
                    
                    // Reset legend UI
                    const legendDiv = document.querySelector('.map-legend');
                    if (legendDiv) {
                        legendDiv.querySelectorAll('.legend-item').forEach(i => i.classList.remove('active'));
                    }

                    window.recalculateMetricsAndMap();
                });
            }
        }
        
        // Execute initial calculation
        window.recalculateMetricsAndMap();
        
        // Draw all connection polylines
        drawPolylines();

        // Auto-fit bounds map load
        if (locationData.length > 0) {
            const bounds = L.latLngBounds(locationData.map(l => [l.lat, l.lng]));
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    };
    
    // Execute map load flow
    initDataAndDraw();

    // Handle Sidebar
    const selectLocation = (loc) => {
        sidebar.classList.add('active');

        let badgeClass = '';
        let typeLabel = '';
        if(loc.type === 'on-site') { badgeClass = 'badge-onsite'; typeLabel = 'On-Site'; }
        else if(loc.type === 'near-site') { badgeClass = 'badge-nearsite'; typeLabel = 'Near-Site'; }
        else if(loc.type === 'remote') { badgeClass = 'badge-remote'; typeLabel = 'Remotely Supported Location'; }
        else { badgeClass = 'badge-pureremote'; typeLabel = 'Fully Remote Users'; }

        // Find parent relationship text
        let parentText = '';
        if (loc.parentId && locationsById[loc.parentId]) {
            parentText = `Covered by: <b>${locationsById[loc.parentId].name}</b>`;
        } else if (loc.type === 'on-site') {
            const deps = locationData.filter(l => l.parentId === loc.id).length;
            parentText = deps > 0 ? `Supports ${deps} near-site location(s)` : 'Provides local support';
        } else {
            parentText = 'Requires travel or remote support only';
        }

        let techProfilesHtml = '';
        if (loc.fieldTechNames && loc.fieldTechNames.length > 0) {
            const profiles = loc.fieldTechNames.map(name => {
                // Generate monogram initials (e.g., "Alfred Calderon" -> "AC")
                const parts = name.split(' ');
                let initials = parts[0]?.[0] || '';
                if(parts.length > 1) initials += parts[parts.length-1]?.[0] || '';
                initials = initials.toUpperCase();
                
                return `
                    <div class="tech-card">
                        <div class="tech-avatar">${initials}</div>
                        <div class="tech-info">
                            <div class="tech-name">${name}</div>
                            <div class="tech-role">IT Field Support</div>
                        </div>
                    </div>
                `;
            }).join('');
            
            techProfilesHtml = `
                <div class="tech-roster-section">
                    <div class="tech-roster-title">Assigned Technicians (${loc.itFieldSupport})</div>
                    <div class="tech-list">${profiles}</div>
                </div>
            `;
        }

        sidebarContent.innerHTML = `
            <div class="location-header">
                <div class="location-title">${loc.name}</div>
                <div class="status-badge ${badgeClass}">${typeLabel}</div>
            </div>
            
            <div class="stat-grid">
                <div class="stat-card">
                    <div class="stat-value">${loc.totalStaff.toLocaleString()}</div>
                    <div class="stat-label">Users</div>
                </div>
                <!-- Highlight Field Support specifically! -->
                <div class="stat-card" style="box-shadow: ${loc.itFieldSupport > 0 ? 'inset 0 0 20px rgba(16, 185, 129, 0.1)' : 'none'}">
                    <div class="stat-value" style="color: ${loc.itFieldSupport > 0 ? '#34d399' : 'var(--text-secondary)'}">${loc.itFieldSupport}</div>
                    <div class="stat-label">IT Field Support <br />Technicians</div>
                </div>
            </div>

            <div class="details-panel">
                <div class="details-row">
                    <span class="details-label">ID / Code</span>
                    <span class="details-value">${loc.id}</span>
                </div>
                <div class="details-row" style="margin-top: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
                    <span class="details-label">Coverage Status</span>
                    <span class="details-value" style="text-align: right; max-width: 60%;">${parentText}</span>
                </div>
            </div>
            ${techProfilesHtml}
            <div id="edit-trigger-container"></div>
        `;

        // Wait to show the correct edit button UI only if they have editing permissions on the SharePoint List
        if (window.spAPI) {
            window.spAPI.checkPermissions().then(canEdit => {
                const container = document.getElementById('edit-trigger-container');
                if (container && canEdit && sidebar.classList.contains('active')) {
                    container.innerHTML = `
                        <button id="trigger-edit-mode" class="edit-trigger-btn">
                            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                            Edit Coverage Model
                        </button>
                    `;
                    document.getElementById('trigger-edit-mode').addEventListener('click', () => {
                        if (window.openEditPanel) window.openEditPanel(loc);
                    });
                }
            });
        }
    };

    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
        setTimeout(() => {
            if (!sidebar.classList.contains('active')) {
                sidebarContent.innerHTML = `
                    <div class="empty-state">
                        Select a location on the map to see details
                    </div>
                `;
            }
        }, 500); // Wait for transition
    });

    const editPanel = document.getElementById('edit-panel');
    const closeEditBtn = document.getElementById('close-edit-btn');
    const editForm = document.getElementById('edit-form');
    const fieldTechsInput = document.getElementById('field-techs-input');
    const techPillContainer = document.getElementById('tech-pill-container');
    const techPillsList = document.getElementById('tech-pills-list');
    const saveStatus = document.getElementById('save-status');
    const saveBtn = document.getElementById('save-btn');
    let currentlyEditingLoc = null;

    let currentTechPills = [];

    const renderTechPills = () => {
        if (!techPillsList) return;
        techPillsList.innerHTML = currentTechPills.map((name, i) => `
            <div class="tech-pill">
                ${name}
                <span class="pill-remove" data-index="${i}">×</span>
            </div>
        `).join('');
    };

    const addTechPill = (inputStr) => {
        const t = inputStr.trim();
        if (t) {
            const splitNames = t.split(',').map(n => n.trim()).filter(n => n);
            splitNames.forEach(sn => {
                if (!currentTechPills.includes(sn)) currentTechPills.push(sn);
            });
            renderTechPills();
        }
    };

    if (techPillContainer) {
        techPillContainer.addEventListener('click', () => {
            fieldTechsInput.focus();
        });
        
        techPillsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('pill-remove')) {
                const idx = parseInt(e.target.dataset.index, 10);
                currentTechPills.splice(idx, 1);
                renderTechPills();
            }
        });
    }

    if (fieldTechsInput) {
        fieldTechsInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault();
                addTechPill(fieldTechsInput.value);
                fieldTechsInput.value = '';
            } else if (e.key === 'Backspace' && fieldTechsInput.value === '') {
                currentTechPills.pop();
                renderTechPills();
            }
        });
        // Catch paste events that might contain commas
        fieldTechsInput.addEventListener('paste', (e) => {
            setTimeout(() => {
                if (fieldTechsInput.value.includes(',')) {
                    addTechPill(fieldTechsInput.value);
                    fieldTechsInput.value = '';
                }
            }, 10);
        });
    }

    // Ctrl+Enter to save
    editPanel.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            editForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    });

    closeEditBtn.addEventListener('click', () => {
        editPanel.classList.remove('active');
    });

    const coverageTypeSelect = document.getElementById('coverage-type-select');
    const parentHubGroup    = document.getElementById('parent-hub-group');
    const hubSearchInput    = document.getElementById('hub-search-input');
    const hubSearchDropdown = document.getElementById('hub-search-dropdown');
    const parentHubValue    = document.getElementById('parent-hub-value');

    // ── Searchable Hub Typeahead ─────────────────────────
    let hubOptions = [];   // { id, name } of on-site hubs for current edit

    const renderHubDropdown = (filter = '') => {
        const q = filter.toLowerCase().trim();
        const matched = hubOptions.filter(h => h.name.toLowerCase().includes(q) || h.id.toLowerCase().includes(q));
        if (matched.length === 0) {
            hubSearchDropdown.innerHTML = `<div class="hub-search-none">No hubs match "${filter}"</div>`;
        } else {
            hubSearchDropdown.innerHTML = matched.map(h => `
                <div class="hub-search-option" data-id="${h.id}">
                    <span class="hub-dot"></span>
                    <span class="hub-name">${h.name}</span>
                    <span class="hub-id">${h.id}</span>
                </div>`).join('');
            // Mark currently selected
            hubSearchDropdown.querySelectorAll('.hub-search-option').forEach(el => {
                if (el.dataset.id === parentHubValue.value) el.classList.add('active');
                el.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    selectHub(el.dataset.id, el.querySelector('.hub-name').textContent);
                });
            });
        }
    };

    const selectHub = (id, name) => {
        parentHubValue.value = id;
        hubSearchInput.value = name;
        hubSearchInput.classList.add('selected');
        hubSearchDropdown.classList.remove('open');
    };

    const clearHub = () => {
        parentHubValue.value = '';
        hubSearchInput.classList.remove('selected');
    };

    hubSearchInput.addEventListener('focus', () => {
        renderHubDropdown(hubSearchInput.value);
        hubSearchDropdown.classList.add('open');
    });
    hubSearchInput.addEventListener('input', () => {
        clearHub();
        renderHubDropdown(hubSearchInput.value);
        hubSearchDropdown.classList.add('open');
    });
    hubSearchInput.addEventListener('blur', () => {
        // Small delay so mousedown on an option fires first
        setTimeout(() => hubSearchDropdown.classList.remove('open'), 150);
    });

    // Show/hide hub picker depending on coverage type
    coverageTypeSelect.addEventListener('change', () => {
        const val = coverageTypeSelect.value;
        const showHub = (val === 'near-site' || val === 'remote');
        parentHubGroup.style.display = showHub ? 'block' : 'none';
    });

    window.openEditPanel = (loc) => {
        currentlyEditingLoc = loc;
        document.getElementById('edit-title').innerText = `Editing ${loc.name}`;
        
        // Technician names
        currentTechPills = [];
        if (loc.fieldTechNames && loc.fieldTechNames.length > 0) {
            currentTechPills = [...loc.fieldTechNames];
        } else if (loc.itFieldSupport > 0) {
            currentTechPills = [loc.itFieldSupport.toString()];
        }
        renderTechPills();
        fieldTechsInput.value = '';

        // Coverage type
        coverageTypeSelect.value = loc.type || 'remote';
        
        if (loc.type === 'pure-remote') {
            coverageTypeSelect.disabled = true;
            document.getElementById('parent-hub-group').style.display = 'none';
        } else {
            coverageTypeSelect.disabled = false;
        }

        // Build hub options: all physical locations (on-site & near-site) excluding self, sorted
        hubOptions = locationData
            .filter(l => (l.type === 'on-site' || l.type === 'near-site') && l.id !== loc.id)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(l => ({ id: l.id, name: l.name }));

        // Pre-fill typeahead if a parent is already set
        if (loc.parentId) {
            const parent = hubOptions.find(h => h.id === loc.parentId);
            if (parent) {
                selectHub(parent.id, parent.name);
            } else {
                hubSearchInput.value = '';
                clearHub();
            }
        } else {
            hubSearchInput.value = '';
            clearHub();
        }

        // Show/hide hub picker for near-site and remotely supported
        const showHub = (loc.type === 'near-site' || loc.type === 'remote');
        parentHubGroup.style.display = showHub ? 'block' : 'none';
        
        saveStatus.innerText = '';
        saveBtn.disabled = false;
        
        editPanel.classList.add('active');
    };

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(!currentlyEditingLoc) return;

        // --- Parse technicians ---
        let newTechNames = [];
        let newCount = 0;
        
        // Check input buffer before saving
        if (fieldTechsInput.value.trim()) {
            addTechPill(fieldTechsInput.value);
            fieldTechsInput.value = '';
        }

        if (currentTechPills.length === 1 && !isNaN(parseInt(currentTechPills[0], 10))) {
            newCount = parseInt(currentTechPills[0], 10);
        } else {
            newCount = currentTechPills.length;
            newTechNames = [...currentTechPills];
        }

        // --- Parse coverage type & parent hub ---
        const newType = coverageTypeSelect.value;
        const newParentId = (newType === 'near-site') ? (parentHubValue.value || null) : null;

        saveBtn.disabled = true;
        saveStatus.style.color = '#f59e0b';
        saveStatus.innerText = 'Saving to SharePoint...';

        if (window.spAPI) {
            window.spAPI.updateFieldTechCount(currentlyEditingLoc.id, newCount)
                .then(result => {
                    saveStatus.style.color = '#10b981';
                    saveStatus.innerText = '✓ Changes saved to SharePoint!';
                    
                    // Apply all changes to the live location object
                    currentlyEditingLoc.itFieldSupport = newCount;
                    currentlyEditingLoc.fieldTechNames = newTechNames;
                    currentlyEditingLoc.type = newType;
                    currentlyEditingLoc.parentId = newParentId;

                    // Redraw this marker's color to match new type
                    if (window.redrawMarker) window.redrawMarker(currentlyEditingLoc);

                    // Redraw all connector polylines so new/removed connections appear
                    if (window.redrawPolylines) window.redrawPolylines();

                    selectLocation(currentlyEditingLoc); // refresh sidebar badge + stats
                    
                    setTimeout(() => editPanel.classList.remove('active'), 1500);
                })
                .catch(err => {
                    saveStatus.style.color = '#ef4444';
                    saveStatus.innerText = '❌ Error: ' + err.message;
                    saveBtn.disabled = false;
                });
        }
    });

    // ESC key closes sidebars
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            editPanel.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });

    // Map click closes sidebar, but NOT edit panel to prevent accidental data loss
    map.on('click', (e) => {
        if (!editPanel.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });

    // Auto-fit bounds map load logic is now inside initDataAndDraw
});

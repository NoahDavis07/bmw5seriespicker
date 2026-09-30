/*
 * Noah's BMW 5 Series Performance Picker
 *
 * PURPOSE
 * -------
 * This picker compares BMW G30/F90 5 Series models using:
 * - Purchase budget
 * - Modification budget
 * - WHP goal
 * - Drivetrain
 * - Main use
 * - Priority
 * - Modification level
 *
 * IMPORTANT
 * ---------
 * WHP = wheel horsepower, not crank horsepower.
 *
 * Build prices are planning ranges, not guaranteed quotes.
 * Actual pricing depends on:
 * - exact model year
 * - engine revision
 * - ECU unlock requirements
 * - fuel used
 * - labor
 * - turbo choice
 * - fueling system
 * - transmission work
 * - cooling
 * - engine condition
 * - supporting maintenance
 *
 * HIGH-POWER BUILDS
 * -----------------
 * 800-1000 WHP builds can vary dramatically.
 * A 1000-WHP "capable" setup is NOT the same thing as a
 * reliable 1000-WHP daily-driver setup.
 */

(() => {
    "use strict";

    // ------------------------------------------------------------
    // BUILD PLAN HELPER
    // ------------------------------------------------------------

    const plan = (
        level,
        whp,
        low,
        high,
        label,
        details,
        fuel = "Varies",
        engineBuild = false,
        transmissionBuild = false,
        confidence = "Moderate"
    ) => ({
        level,
        whp,
        low,
        high,
        label,
        details,
        fuel,
        engineBuild,
        transmissionBuild,
        confidence
    });

    // ------------------------------------------------------------
    // ENGINE GENERATION GUIDE
    // ------------------------------------------------------------

    const engineGuide = {
        B58: {
            family: "BMW B58 3.0L turbo inline-six",
            revisions: [
                {
                    name: "Original B58 / Gen 1",
                    codes: "Examples: B58B30M0 / B58B30O0",
                    description:
                        "First-generation B58 architecture used in cars such as early G30 540i models."
                },
                {
                    name: "B58TU / Gen 2",
                    codes: "Examples: B58B30M1 / B58B30O1",
                    description:
                        "Technical-update B58 with revised fueling, cooling, cylinder-head and supporting systems depending on application."
                },
                {
                    name: "B58TU2",
                    codes: "Later BMW applications",
                    description:
                        "Further-developed B58 generation used in newer BMW platforms after the original B58TU."
                },
                {
                    name: "B58TU3",
                    codes: "Newest-generation applications",
                    description:
                        "Latest major B58 evolution. Not used in the G30 540i profiles modeled here."
                }
            ]
        },

        N63: {
            family: "BMW N63 4.4L twin-turbo V8",
            revisions: [
                {
                    name: "Original N63",
                    description:
                        "Original hot-V twin-turbo N63 architecture."
                },
                {
                    name: "N63TU",
                    description:
                        "First major technical update to the original N63."
                },
                {
                    name: "N63TU2",
                    description:
                        "Later revision used in early G30 M550i applications."
                },
                {
                    name: "N63TU3",
                    description:
                        "Major later revision used in 2020+ G30 M550i models."
                },
                {
                    name: "N63TU3 M3 / T3 variants",
                    description:
                        "Different output/application versions exist inside the N63TU3 family. The M550i uses a high-output variant."
                }
            ]
        },

        S63: {
            family: "BMW S63 high-performance 4.4L twin-turbo V8",
            revisions: [
                {
                    name: "Original S63",
                    description:
                        "Early BMW M hot-V twin-turbo V8."
                },
                {
                    name: "S63TU",
                    description:
                        "First major technical update."
                },
                {
                    name: "S63TU2",
                    description:
                        "Previous-generation high-performance revision."
                },
                {
                    name: "S63TU4",
                    codes: "S63B44T4",
                    description:
                        "Engine used by the F90 M5 generation modeled here. It incorporates major developments derived from later N63 architecture."
                }
            ]
        }
    };

    // ------------------------------------------------------------
    // VEHICLE DATABASE
    // ------------------------------------------------------------

    const cars = [

        // ========================================================
        // BMW 530i
        // ========================================================

        {
            id: "530-b48",
            name: "BMW 530i",
            generation: "G30",
            years: "2017–2023",

            engine: "B48 2.0L turbo inline-four",
            engineCode: "B48 family",
            engineGeneration: "B48",

            transmission: "ZF 8HP automatic",

            startingPrice: 15000,

            drivetrains: ["rwd", "awd"],

            stockWhp: [210, 240],

            traits: {
                cost: 5,
                comfort: 5,
                tuning: 2,
                performance: 1.5,
                track: 1,
                rarity: 1
            },

            builds: [

                plan(
                    1,
                    270,
                    1200,
                    3000,
                    "Basic tuned setup",
                    [
                        "ECU tune",
                        "Fresh spark plugs",
                        "Basic maintenance",
                        "Optional intake",
                        "Optional charge pipe",
                        "Quality premium fuel"
                    ],
                    "93 octane",
                    false,
                    false,
                    "High"
                ),

                plan(
                    1,
                    320,
                    2500,
                    5000,
                    "Full bolt-on setup",
                    [
                        "ECU tune",
                        "Downpipe",
                        "Intake",
                        "Charge-pipe upgrades",
                        "Intercooling / heat-management improvements",
                        "Fresh ignition components"
                    ],
                    "93 octane / ethanol blend depending on tune",
                    false,
                    false,
                    "Moderate"
                ),

                plan(
                    2,
                    350,
                    7000,
                    14000,
                    "Upgraded turbo setup",
                    [
                        "Upgraded turbo",
                        "Custom tune",
                        "Fueling upgrades as required",
                        "Cooling upgrades",
                        "Downpipe",
                        "Intake",
                        "Charge-pipe upgrades",
                        "Transmission calibration"
                    ],
                    "Ethanol blend or race fuel may be required",
                    false,
                    false,
                    "Moderate"
                ),

                plan(
                    2,
                    450,
                    12000,
                    22000,
                    "Extreme B48 build",
                    [
                        "Large upgraded turbo",
                        "Advanced fueling",
                        "Custom ECU calibration",
                        "Cooling system upgrades",
                        "Exhaust upgrades",
                        "Transmission support",
                        "Engine-health inspection"
                    ],
                    "Ethanol / race-fuel oriented",
                    true,
                    true,
                    "Low"
                ),

                plan(
                    2,
                    600,
                    20000,
                    35000,
                    "Built-engine B48 race-oriented build",
                    [
                        "Forged engine internals",
                        "Large turbo system",
                        "Full fuel-system upgrade",
                        "Custom ECU tuning",
                        "Extensive cooling upgrades",
                        "Transmission build",
                        "Driveline upgrades",
                        "Race-oriented supporting hardware"
                    ],
                    "Ethanol / race fuel",
                    true,
                    true,
                    "Low"
                ),

                plan(
                    2,
                    800,
                    30000,
                    50000,
                    "Custom race-development B48 build",
                    [
                        "Fully built engine",
                        "Large custom turbo system",
                        "Full fuel-system conversion",
                        "Standalone or highly customized engine management may be required",
                        "Built transmission",
                        "Custom driveline",
                        "Extensive fabrication",
                        "Race-only cooling strategy"
                    ],
                    "Race fuel / ethanol",
                    true,
                    true,
                    "Very Low"
                ),

                plan(
                    2,
                    1000,
                    45000,
                    70000,
                    "1000-WHP custom B48 development project",
                    [
                        "Fully built race engine",
                        "Custom turbo system",
                        "Custom intake and exhaust fabrication",
                        "Full fuel system",
                        "Built transmission",
                        "Upgraded differential / axles",
                        "Extensive engine-management work",
                        "Extensive cooling",
                        "Dyno development",
                        "Significant fabrication"
                    ],
                    "Race fuel / ethanol",
                    true,
                    true,
                    "Experimental"
                )
            ],

            note:
                "The 530i is a comfort-and-efficiency starting point, not the normal choice for very high power. " +
                "High-WHP numbers are custom race-development territory rather than normal bolt-on builds."
        },

        // ========================================================
        // EARLY BMW 540i - ORIGINAL B58
        // ========================================================

        {
            id: "540-b58-gen1",
            name: "BMW 540i",
            generation: "G30",
            years: "2017–2019",

            engine: "B58 3.0L turbo inline-six",
            engineCode: "B58B30M0",
            engineGeneration: "Original B58 / Gen 1",

            transmission: "ZF 8HP automatic",

            startingPrice: 19000,

            drivetrains: ["rwd", "awd"],

            stockWhp: [290, 330],

            traits: {
                cost: 4,
                comfort: 5,
                tuning: 5,
                performance: 4,
                track: 2.5,
                rarity: 1
            },

            builds: [

                plan(
                    1,
                    400,
                    1500,
                    3500,
                    "Stage 1 / mild bolt-on B58 build",
                    [
                        "ECU tune",
                        "Fresh spark plugs",
                        "Optional intake",
                        "Transmission tune",
                        "Maintenance baseline"
                    ],
                    "93 octane",
                    false,
                    false,
                    "High"
                ),

                plan(
                    1,
                    500,
                    3000,
                    6500,
                    "Full bolt-on / ethanol-blend setup",
                    [
                        "ECU tune",
                        "Downpipe",
                        "Intake",
                        "Upgraded charge pipe where needed",
                        "Transmission tune",
                        "Fueling support depending on ethanol concentration",
                        "Cooling improvements"
                    ],
                    "E30-E50 / ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    600,
                    6500,
                    11000,
                    "Upgraded hybrid-turbo setup",
                    [
                        "Hybrid turbo",
                        "Upgraded HPFP",
                        "LPFP upgrade as required",
                        "Downpipe",
                        "Custom tune",
                        "Transmission tune",
                        "Cooling upgrades",
                        "Fresh ignition system"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    700,
                    9000,
                    15000,
                    "700-WHP Gen-1 B58 setup",
                    [
                        "Large hybrid or small single turbo",
                        "Upgraded HPFP",
                        "LPFP upgrade",
                        "Supplemental or port fueling depending on setup",
                        "Flex-fuel / ethanol capability",
                        "Custom ECU tune",
                        "Transmission tune",
                        "Cooling upgrades",
                        "Downpipe",
                        "Supporting maintenance"
                    ],
                    "E50-E85 depending on tune",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    800,
                    13000,
                    22000,
                    "800-WHP big-turbo Gen-1 B58 setup",
                    [
                        "Big single or high-output hybrid turbo",
                        "Upgraded HPFP",
                        "Upgraded LPFP",
                        "Port injection / supplemental fueling",
                        "Flex-fuel sensor",
                        "Custom tune",
                        "Transmission upgrades",
                        "Cooling upgrades",
                        "Upgraded engine mounts recommended",
                        "Driveline inspection"
                    ],
                    "Ethanol / race fuel",
                    false,
                    true,
                    "Moderate"
                ),

                plan(
                    2,
                    900,
                    19000,
                    32000,
                    "900-WHP Gen-1 B58 build",
                    [
                        "Large single turbo",
                        "Full upgraded fuel system",
                        "Port injection",
                        "Custom calibration",
                        "Built or heavily upgraded ZF8",
                        "Cooling package",
                        "Crankcase ventilation upgrades",
                        "Engine-health verification",
                        "Driveline upgrades"
                    ],
                    "E85 / race fuel",
                    true,
                    true,
                    "Moderate"
                ),

                plan(
                    2,
                    1000,
                    28000,
                    45000,
                    "1000-WHP built Gen-1 B58 setup",
                    [
                        "Forged engine internals",
                        "Built cylinder head as required",
                        "Large-frame single turbo",
                        "Full fuel system",
                        "Port injection",
                        "Upgraded LPFP",
                        "Upgraded HPFP or alternate high-pressure strategy",
                        "Custom ECU tuning",
                        "Built ZF8 transmission",
                        "Axle / driveshaft allowance",
                        "Differential inspection or upgrade",
                        "Cooling upgrades",
                        "Catch-can / crankcase ventilation system",
                        "Dyno development"
                    ],
                    "E85 / race fuel",
                    true,
                    true,
                    "Moderate"
                )
            ],

            note:
                "Early G30 540i models use the original B58 generation. They are excellent tuning platforms, " +
                "but 800-1000 WHP requires much more than a turbo swap."
        },

        // ========================================================
        // LATER BMW 540i - B58TU
        // ========================================================

        {
            id: "540-b58tu",
            name: "BMW 540i",
            generation: "G30",
            years: "2020–2023",

            engine: "B58 3.0L turbo inline-six",
            engineCode: "B58B30M1",
            engineGeneration: "B58TU / Gen 2",

            transmission: "ZF 8HP automatic",

            startingPrice: 28000,

            drivetrains: ["rwd", "awd"],

            stockWhp: [310, 350],

            traits: {
                cost: 3.5,
                comfort: 5,
                tuning: 5,
                performance: 4.2,
                track: 2.5,
                rarity: 1
            },

            builds: [

                plan(
                    1,
                    420,
                    1800,
                    4000,
                    "Stage 1 B58TU setup",
                    [
                        "ECU tune",
                        "Possible ECU unlock depending on production date",
                        "Transmission tune",
                        "Fresh spark plugs",
                        "Maintenance baseline"
                    ],
                    "93 octane",
                    false,
                    false,
                    "High"
                ),

                plan(
                    1,
                    520,
                    3500,
                    7000,
                    "Full bolt-on B58TU setup",
                    [
                        "ECU tune",
                        "Downpipe",
                        "Intake",
                        "Transmission tune",
                        "Flex-fuel / ethanol support",
                        "Cooling improvements",
                        "Fueling upgrades if required"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    600,
                    6500,
                    11000,
                    "Hybrid-turbo B58TU setup",
                    [
                        "Upgraded hybrid turbo",
                        "Fuel-system support",
                        "Custom tuning",
                        "Downpipe",
                        "Transmission tune",
                        "Cooling upgrades",
                        "Ignition maintenance"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    700,
                    8500,
                    14000,
                    "700-WHP B58TU setup",
                    [
                        "Hybrid or single turbo",
                        "Upgraded fuel-system components",
                        "LPFP upgrade as required",
                        "Flex-fuel",
                        "Custom ECU tune",
                        "Transmission tune",
                        "Cooling upgrades",
                        "Downpipe",
                        "Supporting maintenance"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    800,
                    12000,
                    20000,
                    "800-WHP B58TU setup",
                    [
                        "Large hybrid or single turbo",
                        "Full low-pressure fueling support",
                        "Supplemental / port fueling if required",
                        "Flex-fuel",
                        "Custom tuning",
                        "ZF8 upgrades",
                        "Cooling package",
                        "Driveline inspection"
                    ],
                    "Ethanol / race fuel",
                    false,
                    true,
                    "Moderate"
                ),

                plan(
                    2,
                    900,
                    18000,
                    30000,
                    "900-WHP B58TU build",
                    [
                        "Large single turbo",
                        "Advanced fuel system",
                        "Supplemental fueling",
                        "Custom ECU calibration",
                        "Built or upgraded ZF8",
                        "Cooling system",
                        "Driveline upgrades",
                        "Engine-health assessment"
                    ],
                    "E85 / race fuel",
                    true,
                    true,
                    "Moderate"
                ),

                plan(
                    2,
                    1000,
                    26000,
                    42000,
                    "1000-WHP built B58TU setup",
                    [
                        "Forged engine internals",
                        "Large single turbo",
                        "Full fueling system",
                        "Supplemental fueling",
                        "Flex-fuel system",
                        "Custom ECU calibration",
                        "Built transmission",
                        "Axles / driveshaft allowance",
                        "Cooling upgrades",
                        "Crankcase ventilation upgrades",
                        "Dyno development"
                    ],
                    "E85 / race fuel",
                    true,
                    true,
                    "Moderate"
                )
            ],

            note:
                "B58TU models have revised engine and fuel-system architecture compared with the original B58. " +
                "ECU unlock requirements must be checked using the exact production date."
        },

        // ========================================================
        // EARLY M550i - N63TU2
        // ========================================================

        {
            id: "m550-n63tu2",
            name: "BMW M550i xDrive",
            generation: "G30",
            years: "2018–2019",

            engine: "N63 4.4L twin-turbo V8",
            engineCode: "N63B44O2",
            engineGeneration: "N63TU2",

            transmission: "ZF 8HP automatic",

            startingPrice: 25000,

            drivetrains: ["awd"],

            stockWhp: [400, 460],

            traits: {
                cost: 2,
                comfort: 5,
                tuning: 3.5,
                performance: 3.7,
                track: 2,
                rarity: 2
            },

            builds: [

                plan(
                    1,
                    550,
                    2000,
                    4500,
                    "Stage 1 N63TU2 setup",
                    [
                        "ECU tune",
                        "Transmission tune",
                        "Fresh plugs",
                        "Maintenance baseline",
                        "Cooling-system inspection"
                    ],
                    "93 octane",
                    false,
                    false,
                    "High"
                ),

                plan(
                    1,
                    600,
                    3500,
                    7000,
                    "Full bolt-on N63TU2 setup",
                    [
                        "ECU tune",
                        "Downpipes",
                        "Intake / filter upgrades",
                        "Transmission tune",
                        "Cooling inspection",
                        "Fresh ignition components"
                    ],
                    "93 octane / ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    700,
                    9000,
                    16000,
                    "700-WHP N63TU2 setup",
                    [
                        "Upgraded turbos",
                        "Downpipes",
                        "Fueling upgrades",
                        "Custom ECU tune",
                        "Transmission tune",
                        "Cooling upgrades",
                        "Ignition upgrades",
                        "Maintenance reserve"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "Moderate"
                ),

                plan(
                    2,
                    800,
                    14000,
                    23000,
                    "800-WHP N63TU2 build",
                    [
                        "Higher-output upgraded turbos",
                        "Full fueling support",
                        "Custom tuning",
                        "Transmission upgrades",
                        "Cooling upgrades",
                        "Heat-management upgrades",
                        "Driveline inspection",
                        "Preventive maintenance"
                    ],
                    "Ethanol / race fuel",
                    false,
                    true,
                    "Moderate"
                ),

                plan(
                    2,
                    900,
                    22000,
                    36000,
                    "900-WHP built N63TU2 setup",
                    [
                        "Built engine recommended",
                        "Large upgraded turbo system",
                        "Full fuel system",
                        "Custom calibration",
                        "Built transmission",
                        "Cooling upgrades",
                        "Driveline upgrades",
                        "Extensive heat management"
                    ],
                    "E85 / race fuel",
                    true,
                    true,
                    "Low"
                ),

                plan(
                    2,
                    1000,
                    32000,
                    50000,
                    "1000-WHP N63TU2 build",
                    [
                        "Forged engine",
                        "Large upgraded turbos",
                        "Full fuel system",
                        "Custom ECU calibration",
                        "Built transmission",
                        "Upgraded driveline components",
                        "Extensive cooling",
                        "Crankcase ventilation improvements",
                        "Dyno development"
                    ],
                    "E85 / race fuel",
                    true,
                    true,
                    "Low"
                )
            ],

            note:
                "Early M550i models use N63TU2. They can make substantial power, but maintenance and heat management " +
                "should be treated as part of the build budget."
        },

        // ========================================================
        // LATER M550i - N63TU3
        // ========================================================

        {
            id: "m550-n63tu3",
            name: "BMW M550i xDrive",
            generation: "G30",
            years: "2020–2023",

            engine: "N63 4.4L twin-turbo V8",
            engineCode: "N63B44T3",
            engineGeneration: "N63TU3",

            transmission: "ZF 8HP automatic",

            startingPrice: 35000,

            drivetrains: ["awd"],

            stockWhp: [460, 530],

            traits: {
                cost: 2,
                comfort: 5,
                tuning: 4,
                performance: 4,
                track: 2.5,
                rarity: 2
            },

            builds: [

                plan(
                    1,
                    600,
                    2500,
                    5000,
                    "Stage 1 N63TU3 setup",
                    [
                        "ECU tune",
                        "Possible ECU unlock",
                        "Transmission tune",
                        "Fresh spark plugs",
                        "Maintenance baseline"
                    ],
                    "93 octane",
                    false,
                    false,
                    "High"
                ),

                plan(
                    1,
                    700,
                    4500,
                    8500,
                    "Full bolt-on N63TU3 setup",
                    [
                        "ECU tune",
                        "Downpipes",
                        "Intake upgrades",
                        "Transmission tune",
                        "Fueling support",
                        "Cooling inspection",
                        "Ethanol capability"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    800,
                    9000,
                    16000,
                    "800-WHP N63TU3 setup",
                    [
                        "Upgraded turbos",
                        "Fueling upgrades",
                        "Custom ECU tuning",
                        "Transmission tune",
                        "Cooling upgrades",
                        "Downpipes",
                        "Heat management"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "Moderate"
                ),

                plan(
                    2,
                    900,
                    15000,
                    26000,
                    "900-WHP N63TU3 build",
                    [
                        "Higher-output turbo system",
                        "Full fuel-system upgrades",
                        "Custom tuning",
                        "Transmission upgrades",
                        "Cooling upgrades",
                        "Driveline inspection",
                        "Preventive maintenance"
                    ],
                    "E85 / race fuel",
                    false,
                    true,
                    "Moderate"
                ),

                plan(
                    2,
                    1000,
                    24000,
                    40000,
                    "1000-WHP N63TU3 build",
                    [
                        "Large upgraded turbo system",
                        "Full fueling package",
                        "Custom ECU tuning",
                        "Built or reinforced transmission",
                        "Engine build recommended depending on torque target",
                        "Cooling upgrades",
                        "Driveline upgrades",
                        "Heat-management system",
                        "Dyno development"
                    ],
                    "E85 / race fuel",
                    true,
                    true,
                    "Moderate"
                )
            ],

            note:
                "N63TU3 is significantly revised compared with earlier N63 versions. " +
                "Do not apply N63TU2 parts or power assumptions to an N63TU3 car without confirming compatibility."
        },

        // ========================================================
        // F90 M5
        // ========================================================

        {
            id: "m5-s63tu4",
            name: "BMW M5",
            generation: "F90",
            years: "2018–2023",

            engine: "S63 4.4L twin-turbo V8",
            engineCode: "S63B44T4",
            engineGeneration: "S63TU4",

            transmission: "ZF 8HP M Steptronic",

            startingPrice: 40000,

            drivetrains: ["awd"],

            stockWhp: [550, 610],

            traits: {
                cost: 1.5,
                comfort: 4,
                tuning: 4.5,
                performance: 4.7,
                track: 4.5,
                rarity: 3
            },

            builds: [

                plan(
                    1,
                    650,
                    2000,
                    4500,
                    "Stage 1 S63TU4 setup",
                    [
                        "ECU tune",
                        "Transmission tune",
                        "Fresh ignition components",
                        "Maintenance baseline"
                    ],
                    "93 octane",
                    false,
                    false,
                    "High"
                ),

                plan(
                    1,
                    750,
                    3500,
                    7000,
                    "Full bolt-on S63TU4 setup",
                    [
                        "ECU tune",
                        "Downpipes",
                        "Intake upgrades",
                        "Transmission tune",
                        "Ethanol blend",
                        "Cooling / heat-management inspection"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    850,
                    7500,
                    14000,
                    "850-WHP S63TU4 setup",
                    [
                        "Upgraded turbos or aggressive stock-frame setup",
                        "Fueling upgrades",
                        "Custom tune",
                        "Downpipes",
                        "Transmission calibration",
                        "Cooling upgrades"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    900,
                    10000,
                    18000,
                    "900-WHP S63TU4 setup",
                    [
                        "Upgraded turbos",
                        "Full fueling support",
                        "Custom ECU tune",
                        "Transmission tune",
                        "Cooling upgrades",
                        "Heat-management upgrades",
                        "Driveline inspection"
                    ],
                    "E85 / race fuel",
                    false,
                    false,
                    "Moderate"
                ),

                plan(
                    2,
                    1000,
                    15000,
                    26000,
                    "1000-WHP S63TU4 setup",
                    [
                        "High-output upgraded turbos",
                        "Full fuel system",
                        "Custom tuning",
                        "Transmission upgrades",
                        "Cooling upgrades",
                        "Heat-management upgrades",
                        "Driveline inspection",
                        "Engine-health verification"
                    ],
                    "E85 / race fuel",
                    false,
                    true,
                    "Moderate"
                )
            ],

            note:
                "The F90 M5 starts with the high-performance S63TU4 and requires less modification than lower-tier " +
                "5 Series models to reach very high power."
        },

        // ========================================================
        // F90 M5 COMPETITION
        // ========================================================

        {
            id: "m5comp-s63tu4",
            name: "BMW M5 Competition",
            generation: "F90",
            years: "2019–2023",

            engine: "S63 4.4L twin-turbo V8",
            engineCode: "S63B44T4",
            engineGeneration: "S63TU4",

            transmission: "ZF 8HP M Steptronic",

            startingPrice: 50000,

            drivetrains: ["awd"],

            stockWhp: [570, 630],

            traits: {
                cost: 1,
                comfort: 3.5,
                tuning: 4.5,
                performance: 4.9,
                track: 4.8,
                rarity: 3.5
            },

            builds: [

                plan(
                    1,
                    675,
                    2000,
                    4500,
                    "Stage 1 M5 Competition setup",
                    [
                        "ECU tune",
                        "Transmission tune",
                        "Maintenance baseline"
                    ],
                    "93 octane",
                    false,
                    false,
                    "High"
                ),

                plan(
                    1,
                    775,
                    3500,
                    7000,
                    "Full bolt-on M5 Competition setup",
                    [
                        "ECU tune",
                        "Downpipes",
                        "Intake upgrades",
                        "Transmission tune",
                        "Ethanol blend",
                        "Cooling inspection"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    850,
                    7500,
                    14000,
                    "850-WHP M5 Competition setup",
                    [
                        "Upgraded turbos",
                        "Fueling upgrades",
                        "Custom ECU tuning",
                        "Transmission calibration",
                        "Cooling upgrades"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    900,
                    10000,
                    18000,
                    "900-WHP M5 Competition setup",
                    [
                        "High-output turbo system",
                        "Full fueling support",
                        "Custom tuning",
                        "Transmission tune",
                        "Cooling upgrades",
                        "Heat management"
                    ],
                    "E85 / race fuel",
                    false,
                    false,
                    "Moderate"
                ),

                plan(
                    2,
                    1000,
                    15000,
                    26000,
                    "1000-WHP M5 Competition setup",
                    [
                        "High-output upgraded turbos",
                        "Full fuel system",
                        "Custom ECU tune",
                        "Transmission upgrades",
                        "Cooling upgrades",
                        "Heat-management upgrades",
                        "Driveline inspection",
                        "Engine-health verification"
                    ],
                    "E85 / race fuel",
                    false,
                    true,
                    "Moderate"
                )
            ],

            note:
                "The Competition uses the same S63TU4 engine family as the standard F90 M5, " +
                "with different factory calibration and chassis specification."
        },

        // ========================================================
        // M5 CS
        // ========================================================

        {
            id: "m5cs-s63tu4",
            name: "BMW M5 CS",
            generation: "F90",
            years: "2022",

            engine: "S63 4.4L twin-turbo V8",
            engineCode: "S63B44T4",
            engineGeneration: "S63TU4",

            transmission: "ZF 8HP M Steptronic",

            startingPrice: 120000,

            drivetrains: ["awd"],

            stockWhp: [590, 640],

            traits: {
                cost: 0.5,
                comfort: 2.5,
                tuning: 3,
                performance: 5,
                track: 5,
                rarity: 5
            },

            builds: [

                plan(
                    1,
                    675,
                    2500,
                    5000,
                    "Stage 1 M5 CS setup",
                    [
                        "ECU tune",
                        "Transmission tune",
                        "Maintenance baseline"
                    ],
                    "93 octane",
                    false,
                    false,
                    "High"
                ),

                plan(
                    1,
                    775,
                    4000,
                    7500,
                    "Full bolt-on M5 CS setup",
                    [
                        "ECU tune",
                        "Downpipes",
                        "Intake upgrades",
                        "Transmission tune",
                        "Ethanol blend"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    850,
                    8000,
                    15000,
                    "850-WHP M5 CS setup",
                    [
                        "Upgraded turbos",
                        "Fueling upgrades",
                        "Custom tune",
                        "Transmission calibration",
                        "Cooling improvements"
                    ],
                    "Ethanol blend",
                    false,
                    false,
                    "High"
                ),

                plan(
                    2,
                    900,
                    11000,
                    19000,
                    "900-WHP M5 CS setup",
                    [
                        "High-output turbos",
                        "Full fueling support",
                        "Custom tuning",
                        "Transmission tuning",
                        "Cooling upgrades"
                    ],
                    "E85 / race fuel",
                    false,
                    false,
                    "Moderate"
                ),

                plan(
                    2,
                    1000,
                    16000,
                    28000,
                    "1000-WHP M5 CS setup",
                    [
                        "High-output turbo system",
                        "Full fueling system",
                        "Custom ECU tune",
                        "Transmission upgrades",
                        "Cooling upgrades",
                        "Heat management",
                        "Driveline inspection"
                    ],
                    "E85 / race fuel",
                    false,
                    true,
                    "Moderate"
                )
            ],

            note:
                "The M5 CS is extremely capable but also collectible and expensive. " +
                "Heavy modification can reduce originality and collector appeal."
        }
    ];

    // ------------------------------------------------------------
    // MODIFICATION LEVELS
    // ------------------------------------------------------------

    const levels = {
        stock: 0,
        light: 1,
        major: 2
    };

    const priorityNames = {
        cost: "lower ownership and running costs",
        comfort: "daily comfort",
        tuning: "modification potential",
        performance: "performance",
        track: "track capability",
        rarity: "rarity and collectibility"
    };

    const useNames = {
        daily: "daily driving",
        roll: "closed-course roll racing",
        dig: "drag-strip launches",
        both: "roll and drag-strip use",
        track: "circuit track days"
    };

    // ------------------------------------------------------------
    // MONEY HELPERS
    // ------------------------------------------------------------

    const money = value =>
        "$" + Math.round(value).toLocaleString("en-US");

    const moneyRange = (low, high) =>
        low === high
            ? money(low)
            : money(low) + "–" + money(high);

    // ------------------------------------------------------------
    // CAR EVALUATION
    // ------------------------------------------------------------

    function evaluateCar(car, answers) {

        const reject = reason => ({
            car,
            reason
        });

        // Purchase budget
        if (answers.budget < car.startingPrice) {
            return reject(
                "Purchase budget is below this profile's estimated starting price of " +
                money(car.startingPrice) +
                "."
            );
        }

        // Drivetrain
        if (
            answers.drivetrain !== "any" &&
            !car.drivetrains.includes(answers.drivetrain)
        ) {
            return reject(
                "This model does not match the requested factory drivetrain."
            );
        }

        const stock = plan(
            0,
            car.stockWhp[1],
            0,
            0,
            "Keep it stock",
            ["No performance modifications required"],
            "Factory fuel",
            false,
            false,
            "High"
        );

        const allowed = [stock, ...car.builds].filter(item =>
            item.level <= levels[answers.mods]
        );

        let selected = stock;

        // --------------------------------------------------------
        // WHP GOAL
        // --------------------------------------------------------

        if (answers.power !== null) {

            const capable = allowed.filter(item =>
                answers.power <= item.whp
            );

            if (!capable.length) {
                return reject(
                    "No " +
                    answers.power +
                    "-WHP build is modeled at your selected modification level."
                );
            }

            selected = capable.sort((a, b) => {
                return (
                    a.whp - b.whp ||
                    a.low - b.low
                );
            })[0];
        }

        // --------------------------------------------------------
        // BEST AFFORDABLE UPGRADE
        // --------------------------------------------------------

        const affordable = allowed.filter(item =>
            item.low <= answers.modBudget
        );

        const upgrade = affordable.reduce((best, item) => {
            return item.whp > best.whp ? item : best;
        }, stock);

        // --------------------------------------------------------
        // DRIVETRAIN CHOICE
        // --------------------------------------------------------

        const launchUse =
            answers.use === "dig" ||
            answers.use === "both";

        const chosenDrive =
            answers.drivetrain !== "any"
                ? answers.drivetrain
                : car.drivetrains.length === 1
                    ? car.drivetrains[0]
                    : launchUse
                        ? "awd"
                        : "any";

        // --------------------------------------------------------
        // SCORE
        // --------------------------------------------------------

        const speed =
            Math.min(5, upgrade.whp / 150);

        const useScore = {
            daily: car.traits.comfort,
            roll: speed,
            dig:
                speed +
                (chosenDrive === "awd" ? 2 : 0),

            both:
                speed +
                (chosenDrive === "awd" ? 1.5 : 0),

            track: car.traits.track
        }[answers.use];

        let score =
            car.traits[answers.priority] * 10 +
            useScore * 3;

        if (
            answers.mods !== "stock" &&
            answers.modBudget > 0 &&
            answers.priority !== "performance"
        ) {
            score += car.traits.tuning;
        }

        if (answers.power !== null) {

            // Reward cars that reach the goal with fewer modifications.
            score -= selected.level * 2;

            // Reward cheaper ways of reaching the same target.
            score -= selected.low / 10000;

            // Penalize huge overkill slightly.
            score -=
                Math.max(
                    0,
                    selected.whp - answers.power
                ) / 200;
        }

        if (
            answers.priority === "rarity" &&
            selected.level > 0
        ) {
            score -= 5;
        }

        return {
            car,
            selected,
            upgrade,
            chosenDrive,
            score,

            modificationBudgetShortfall:
                Math.max(
                    0,
                    selected.low - answers.modBudget
                ),

            selectedFitsBudget:
                selected.low <= answers.modBudget,

            totalLow:
                car.startingPrice + selected.low,

            totalHigh:
                car.startingPrice + selected.high
        };
    }

    // ------------------------------------------------------------
    // RECOMMEND
    // ------------------------------------------------------------

    function recommend(answers) {

        const checked =
            cars.map(car =>
                evaluateCar(car, answers)
            );

        const ranked = checked

            .filter(item => !item.reason)

            .sort((a, b) => {

                // Affordable builds first
                return (
                    Number(!a.selectedFitsBudget) -
                    Number(!b.selectedFitsBudget) ||

                    // Then overall score
                    b.score - a.score ||

                    // Then lower total cost
                    a.totalLow - b.totalLow
                );
            });

        return {
            matches: ranked,
            excluded:
                checked.filter(item => item.reason)
        };
    }

    // ------------------------------------------------------------
    // APP
    // ------------------------------------------------------------

    function startPicker() {

        const ids = [
            "budget",
            "priority",
            "mods",
            "power",
            "drivetrain",
            "use",
            "modBudget"
        ];

        const fields =
            Object.fromEntries(
                ids.map(id => [
                    id,
                    document.getElementById(id)
                ])
            );

        const button =
            document.getElementById("find-car");

        const results =
            document.getElementById("results");

        const missing =
            ids.filter(id => !fields[id]);

        if (
            !button ||
            !results ||
            missing.length
        ) {
            console.error(
                "Picker requires HTML IDs: " +
                "find-car, results, " +
                ids.join(", ") +
                ". Missing: " +
                missing.join(", ")
            );

            return;
        }

        results.style.gridColumn = "1 / -1";

        results.setAttribute(
            "aria-live",
            "polite"
        );

        results.setAttribute(
            "tabindex",
            "-1"
        );

        let hasResults = false;

        // --------------------------------------------------------
        // SAFE ELEMENT CREATION
        // --------------------------------------------------------

        function add(
            tag,
            text,
            parent = results
        ) {

            const element =
                document.createElement(tag);

            element.textContent = text;

            parent.appendChild(element);

            return element;
        }

        function addList(
            items,
            parent
        ) {

            const list =
                document.createElement("ul");

            parent.appendChild(list);

            items.forEach(item => {
                add("li", item, list);
            });

            return list;
        }

        // --------------------------------------------------------
        // ERRORS
        // --------------------------------------------------------

        function error(
            message,
            id
        ) {

            results.replaceChildren();

            add("p", message);

            fields[id].focus();

            hasResults = false;

            return null;
        }

        // --------------------------------------------------------
        // READ INPUT
        // --------------------------------------------------------

        function readAnswers() {

            const answers = {};

            for (
                const id of
                ["budget", "modBudget", "power"]
            ) {

                const input = fields[id];

                if (
                    id === "power" &&
                    input.value.trim() === "" &&
                    !input.validity.badInput
                ) {
                    answers.power = null;
                    continue;
                }

                const value =
                    Number(input.value);

                const minimum =
                    id === "modBudget"
                        ? 0
                        : 1;

                if (
                    input.value.trim() === "" ||
                    !input.checkValidity() ||
                    !Number.isSafeInteger(value) ||
                    value < minimum
                ) {

                    const label =
                        id === "budget"
                            ? "purchase budget"

                            : id === "power"
                                ? "WHP goal"

                                : "modification budget";

                    return error(
                        "Enter a whole-number " +
                        label +
                        " of at least " +
                        minimum +
                        "." +
                        (
                            id === "power"
                                ? " You can also leave the WHP goal blank."
                                : ""
                        ),
                        id
                    );
                }

                answers[id] = value;
            }

            const choices = {
                priority:
                    Object.keys(priorityNames),

                mods:
                    Object.keys(levels),

                drivetrain:
                    ["any", "rwd", "awd"],

                use:
                    Object.keys(useNames)
            };

            for (
                const [id, options]
                of Object.entries(choices)
            ) {

                if (
                    !options.includes(
                        fields[id].value
                    )
                ) {

                    const label = {
                        priority:
                            "main priority",

                        mods:
                            "modification level",

                        drivetrain:
                            "drivetrain",

                        use:
                            "main driving use"
                    }[id];

                    return error(
                        "Choose your " +
                        label +
                        " first.",
                        id
                    );
                }

                answers[id] =
                    fields[id].value;
            }

            if (
                answers.mods === "stock" &&
                answers.modBudget !== 0
            ) {

                return error(
                    "For 'keep it stock', enter 0 for the modification budget or choose a modification level.",
                    "modBudget"
                );
            }

            return answers;
        }

        // --------------------------------------------------------
        // BUILD DETAILS
        // --------------------------------------------------------

        function addBuildDetails(
            selected,
            article
        ) {

            const details =
                document.createElement("details");

            article.appendChild(details);

            add(
                "summary",
                "Build details",
                details
            );

            add(
                "p",
                "Estimated capability: up to approximately " +
                selected.whp +
                " WHP.",
                details
            );

            add(
                "p",
                "Estimated modification cost: " +
                moneyRange(
                    selected.low,
                    selected.high
                ) +
                ".",
                details
            );

            add(
                "p",
                "Fuel assumption: " +
                selected.fuel +
                ".",
                details
            );

            add(
                "p",
                "Engine build: " +
                (
                    selected.engineBuild
                        ? "Recommended / expected at this level."
                        : "Not automatically required by this model."
                ),
                details
            );

            add(
                "p",
                "Transmission build: " +
                (
                    selected.transmissionBuild
                        ? "Recommended / expected."
                        : "Stock hardware may be usable depending on torque, condition and calibration."
                ),
                details
            );

            add(
                "p",
                "Estimate confidence: " +
                selected.confidence +
                ".",
                details
            );

            add(
                "h4",
                "Typical hardware / work",
                details
            );

            addList(
                selected.details,
                details
            );
        }

        // --------------------------------------------------------
        // SHOW ONE RESULT
        // --------------------------------------------------------

        function explain(
            item,
            answers,
            index
        ) {

            const {
                car,
                selected,
                upgrade
            } = item;

            const article =
                document.createElement("article");

            results.appendChild(article);

            add(
                "h3",
                (
                    index === 0
                        ? "Top match: "
                        : "Also consider: "
                ) +
                car.name,
                article
            );

            const driveText =
                item.chosenDrive === "awd"

                    ? "AWD / xDrive"

                    : item.chosenDrive === "rwd"

                        ? "RWD"

                        : "RWD or AWD";

            add(
                "p",
                car.generation +
                " · " +
                car.years +
                " · " +
                driveText,
                article
            );

            add(
                "p",
                "Engine: " +
                car.engine +
                " · " +
                car.engineCode +
                " · " +
                car.engineGeneration +
                ".",
                article
            );

            add(
                "p",
                "Transmission: " +
                car.transmission +
                ".",
                article
            );

            add(
                "p",
                "Approximate stock screening range: " +
                car.stockWhp[0] +
                "–" +
                car.stockWhp[1] +
                " WHP.",
                article
            );

            add(
                "p",
                "Estimated vehicle starting price: " +
                money(car.startingPrice) +
                ".",
                article
            );

            if (
                answers.power !== null
            ) {

                add(
                    "p",
                    "Your goal: " +
                    answers.power +
                    " WHP.",
                    article
                );

                add(
                    "p",
                    "Suggested build tier: " +
                    selected.label +
                    ".",
                    article
                );

                add(
                    "p",
                    "Estimated modification allowance: " +
                    moneyRange(
                        selected.low,
                        selected.high
                    ) +
                    ".",
                    article
                );

                add(
                    "p",
                    "Estimated car + build total: " +
                    moneyRange(
                        item.totalLow,
                        item.totalHigh
                    ) +
                    " before taxes, registration, insurance, maintenance and unexpected repairs.",
                    article
                );

                if (
                    !item.selectedFitsBudget
                ) {

                    add(
                        "p",
                        "Budget warning: this setup begins about " +
                        money(
                            item.modificationBudgetShortfall
                        ) +
                        " above your entered modification budget.",
                        article
                    );
                }

                addBuildDetails(
                    selected,
                    article
                );

            } else {

                add(
                    "p",
                    "No WHP goal was entered, so the recommendation is based primarily on your purchase budget, priorities and intended use.",
                    article
                );

                if (
                    upgrade.level > 0
                ) {

                    add(
                        "p",
                        "With your current modification budget, a possible future build is: " +
                        upgrade.label +
                        ", targeting approximately " +
                        upgrade.whp +
                        " WHP.",
                        article
                    );

                    addBuildDetails(
                        upgrade,
                        article
                    );
                }
            }

            add(
                "p",
                "Why it appears: " +
                car.note,
                article
            );

            if (
                answers.use === "track"
            ) {

                add(
                    "p",
                    "Track-use note: power should come after tires, brakes, brake fluid, alignment and cooling.",
                    article
                );
            }
        }

        // --------------------------------------------------------
        // ENGINE GUIDE
        // --------------------------------------------------------

        function addEngineGuide() {

            const details =
                document.createElement("details");

            results.appendChild(details);

            add(
                "summary",
                "BMW engine generations / TU guide",
                details
            );

            Object.values(
                engineGuide
            ).forEach(family => {

                add(
                    "h3",
                    family.family,
                    details
                );

                family.revisions.forEach(
                    revision => {

                        add(
                            "h4",
                            revision.name,
                            details
                        );

                        if (
                            revision.codes
                        ) {

                            add(
                                "p",
                                revision.codes,
                                details
                            );
                        }

                        add(
                            "p",
                            revision.description,
                            details
                        );
                    }
                );
            });

            add(
                "p",
                "TU means Technical Update. BMW engine-generation naming is not always perfectly sequential across every engine family. Do not assume that a missing TU number represents an engine used in the same chassis.",
                details
            );

            add(
                "p",
                "The newer S68 V8 is its own successor engine family and should not simply be described as N63TU4 or S63TU5.",
                details
            );
        }

        // --------------------------------------------------------
        // ESTIMATE NOTES
        // --------------------------------------------------------

        function addEstimateNotes() {

            const details =
                document.createElement("details");

            results.appendChild(details);

            add(
                "summary",
                "How power and pricing estimates work",
                details
            );

            add(
                "p",
                "All WHP figures are approximate wheel-horsepower targets. Dynos, fuel, weather, drivetrain loss, turbo selection and calibration can cause substantial differences.",
                details
            );

            add(
                "p",
                "The cost ranges represent complete-build planning allowances rather than the price of a single turbo or tune.",
                details
            );

            add(
                "p",
                "A complete build can include tuning, turbochargers, fuel-system components, cooling, labor, ECU unlocking, transmission work, drivetrain components and maintenance.",
                details
            );

            add(
                "p",
                "At approximately 800-1000 WHP, engine and transmission condition become increasingly important. Two cars making the same peak power may require very different hardware depending on torque, fuel and intended use.",
                details
            );

            add(
                "p",
                "Repeated drag racing, track use and aggressive launches can require more supporting hardware than a car primarily used for highway pulls or occasional street driving.",
                details
            );
        }

        // --------------------------------------------------------
        // BUTTON
        // --------------------------------------------------------

        button.addEventListener(
            "click",
            () => {

                const answers =
                    readAnswers();

                if (!answers) return;

                const {
                    matches,
                    excluded
                } = recommend(answers);

                results.replaceChildren();

                add(
                    "h2",
                    matches.length
                        ? "Your BMW 5 Series matches"
                        : "No exact match found"
                );

                add(
                    "p",
                    "Purchase budget: " +
                    money(answers.budget) +

                    " · Modification budget: " +
                    money(answers.modBudget) +

                    " · WHP goal: " +
                    (
                        answers.power ??
                        "Not specified"
                    )
                );

                add(
                    "p",
                    "These are planning estimates, not guaranteed dyno results or shop quotes."
                );

                if (
                    matches.length
                ) {

                    matches.forEach(
                        (item, index) =>
                            explain(
                                item,
                                answers,
                                index
                            )
                    );

                } else {

                    add(
                        "p",
                        "Your combination of purchase budget, modification level, drivetrain and WHP target does not match a modeled build. Review the exclusions below."
                    );
                }

                if (
                    answers.drivetrain === "rwd"
                ) {

                    add(
                        "p",
                        "F90 M5 models are categorized as AWD because M xDrive is their factory drivetrain, even though the system includes a selectable rear-wheel-drive mode."
                    );
                }

                if (
                    excluded.length
                ) {

                    const details =
                        document.createElement("details");

                    details.open =
                        matches.length === 0;

                    results.appendChild(details);

                    add(
                        "summary",
                        "Why other models were excluded",
                        details
                    );

                    const list =
                        document.createElement("ul");

                    details.appendChild(list);

                    excluded.forEach(
                        item => {

                            add(
                                "li",
                                item.car.name +
                                " (" +
                                item.car.years +
                                "): " +
                                item.reason,
                                list
                            );
                        }
                    );
                }

                addEngineGuide();

                addEstimateNotes();

                hasResults = true;

                results.focus();
            }
        );

        // --------------------------------------------------------
        // RESET RESULTS WHEN INPUT CHANGES
        // --------------------------------------------------------

        ids.forEach(id => {

            fields[id].addEventListener(
                "input",
                () => {

                    if (
                        hasResults
                    ) {

                        results.replaceChildren();

                        add(
                            "p",
                            "Answers changed. Click Find My 5 Series to update your matches."
                        );

                        hasResults = false;
                    }
                }
            );
        });

        // --------------------------------------------------------
        // ENTER KEY SUPPORT
        // --------------------------------------------------------

        [
            "budget",
            "power",
            "modBudget"
        ].forEach(id => {

            fields[id].addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        button.click();
                    }
                }
            );
        });
    }

    // ------------------------------------------------------------
    // START
    // ------------------------------------------------------------

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            startPicker,
            {
                once: true
            }
        );

    } else {

        startPicker();
    }

})();
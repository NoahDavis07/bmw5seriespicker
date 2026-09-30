/*
 * Noah Davis — G30 / F90 BMW 5 Series Picker
 *
 * WHP means wheel horsepower.
 * Prices and power figures are planning estimates.
 * Reliability categories are project rules, not measured failure rates.
 * Every recommendation requires checking the actual car and build.
 */

(() => {
    "use strict";

    // Creates a consistently structured modification plan.
    const plan = (level, whp, low, high, label, options = {}) => ({
        level,
        whp,
        low,
        high,
        label,
        fuel:
            options.fuel ||
            "Premium pump fuel / ethanol blend as required by calibration",
        hardware: options.hardware || [],
        notes: options.notes || "",
        confidence: options.confidence || "medium",
        engineBuild: Boolean(options.engineBuild),
        transmissionBuild: Boolean(options.transmissionBuild),
        customOnly: Boolean(options.customOnly)
    });

    const engineGlossary = {
        b58: [
            "Original B58 / Gen 1 — examples include B58B30M0. Used by the early G30 540i profile here.",
            "B58TU / Gen 2 — examples include B58B30M1 and higher-output O1 variants. This picker separates the later G30 540i from the original B58 car.",
            "B58TU2 / Gen 3 — newer applications outside this G30 picker. Parts and tuning information should not automatically be transferred between generations.",
            "Later B58 revisions, including TU3 references, are outside this picker. Verify the exact engine code, market and production date."
        ],
        n63: [
            "Original N63 — N63B44O0. Not the engine used by the G30 M550i profiles here.",
            "N63TU — N63B44O1. First major technical update; not the G30 M550i engine profile used here.",
            "N63TU2 — N63B44O2 / N63R. Used by the 2018–2019 M550i profile.",
            "N63TU3 — includes N63B44M3 and the higher-output N63B44T3. The 2020–2023 M550i profile uses N63B44T3.",
            "There is no G30-era N63TU4 profile in this picker. Newer BMW V8 applications can use the S68 family."
        ],
        s63: [
            "Original S63 — S63B44O0, associated with the E70/E71 X5 M/X6 M generation.",
            "S63TU — S63B44T0, used by F10 M5/F1x M6 applications.",
            "S63TU2 — S63B44T2, used by F85/F86 X5 M/X6 M applications.",
            "S63TU4 — S63B44T4. Used by the F90 M5, M5 Competition and M5 CS profiles here.",
            "Do not assume a separate F90 S63TU3 profile. Verify the engine code rather than relying only on a TU nickname."
        ]
    };

    // CAR DATA
    // Each ID connects a car to its reliability profile further below.
    const cars = [
        {
            id: "530-17-19",
            name: "BMW 530i",
            generation: "G30",
            years: "2017–2019",
            engine: "B46/B48-family 2.0T (market-dependent emissions specification)",
            engineFamily: "B46/B48",
            engineRevision: "early G30 four-cylinder",
            transmission: "ZF 8HP",
            startingPrice: 14000,
            drivetrains: ["rwd", "awd"],
            stockWhp: [210, 235],
            traits: {
                cost: 5,
                comfort: 5,
                tuning: 2,
                performance: 1.5,
                track: 1,
                rarity: 1
            },
            builds: [
                plan(1, 300, 1000, 2500, "Basic tuned street setup", {
                    hardware: [
                        "ECU tune",
                        "fresh plugs",
                        "optional intake/downpipe where legal"
                    ]
                }),
                plan(2, 400, 6000, 11000, "Upgraded-turbo four-cylinder build", {
                    hardware: [
                        "turbo upgrade",
                        "fueling as required",
                        "charge/cooling upgrades",
                        "custom tune"
                    ]
                }),
                plan(2, 500, 10000, 18000, "Built-supporting-system 500-WHP build", {
                    hardware: [
                        "larger turbo",
                        "fuel system",
                        "cooling",
                        "custom calibration",
                        "driveline allowance"
                    ],
                    notes:
                        "At this output the 530i stops being the cost-efficient choice versus a 540i.",
                    confidence: "low"
                }),
                plan(2, 600, 16000, 27000, "Custom 600-WHP four-cylinder build", {
                    hardware: [
                        "built engine strongly recommended",
                        "large turbo",
                        "full fueling",
                        "cooling",
                        "transmission/driveline strategy"
                    ],
                    engineBuild: true,
                    customOnly: true,
                    confidence: "low"
                }),
                plan(2, 700, 25000, 40000, "Race-oriented 700-WHP build", {
                    engineBuild: true,
                    transmissionBuild: true,
                    customOnly: true,
                    confidence: "low",
                    hardware: [
                        "forged engine",
                        "large-frame turbo",
                        "complete fuel system",
                        "transmission build",
                        "axles/driveline",
                        "thermal management"
                    ]
                }),
                plan(2, 800, 35000, 55000, "Extreme custom 800-WHP build", {
                    engineBuild: true,
                    transmissionBuild: true,
                    customOnly: true,
                    confidence: "low"
                }),
                plan(2, 900, 50000, 75000, "Extreme custom 900-WHP build", {
                    engineBuild: true,
                    transmissionBuild: true,
                    customOnly: true,
                    confidence: "low"
                }),
                plan(
                    2,
                    1000,
                    70000,
                    105000,
                    "1000-WHP race-development build",
                    {
                        engineBuild: true,
                        transmissionBuild: true,
                        customOnly: true,
                        confidence: "very low",
                        notes:
                            "A custom motorsport-development allowance, not a proven off-the-shelf street recipe or guaranteed result."
                    }
                )
            ],
            note:
                "Best when the priority is purchase/running cost. For big-power goals, the supporting work can erase the savings versus starting with a 540i."
        },
        {
            id: "530-20-23",
            name: "BMW 530i",
            generation: "G30",
            years: "2020–2023",
            engine: "B46TU/B48TU-family 2.0T (market-dependent emissions specification)",
            engineFamily: "B46/B48",
            engineRevision: "TU-era G30 four-cylinder",
            transmission: "ZF 8HP51-family",
            startingPrice: 18000,
            drivetrains: ["rwd", "awd"],
            stockWhp: [210, 235],
            traits: {
                cost: 4.5,
                comfort: 5,
                tuning: 2,
                performance: 1.6,
                track: 1,
                rarity: 1
            },
            builds: [
                plan(1, 300, 1000, 2500, "Basic tuned street setup"),
                plan(2, 400, 6000, 11000, "Upgraded-turbo four-cylinder build"),
                plan(2, 500, 10000, 18000, "Built-supporting-system 500-WHP build", {
                    confidence: "low"
                }),
                plan(2, 600, 16000, 27000, "Custom 600-WHP four-cylinder build", {
                    engineBuild: true,
                    customOnly: true,
                    confidence: "low"
                }),
                plan(2, 700, 25000, 40000, "Race-oriented 700-WHP build", {
                    engineBuild: true,
                    transmissionBuild: true,
                    customOnly: true,
                    confidence: "low"
                }),
                plan(2, 800, 35000, 55000, "Extreme custom 800-WHP build", {
                    engineBuild: true,
                    transmissionBuild: true,
                    customOnly: true,
                    confidence: "low"
                }),
                plan(2, 900, 50000, 75000, "Extreme custom 900-WHP build", {
                    engineBuild: true,
                    transmissionBuild: true,
                    customOnly: true,
                    confidence: "low"
                }),
                plan(2, 1000, 70000, 105000, "1000-WHP race-development build", {
                    engineBuild: true,
                    transmissionBuild: true,
                    customOnly: true,
                    confidence: "very low"
                })
            ],
            note:
                "Later 530i profile. Still a poor economic starting point for extreme power compared with a six-cylinder 540i."
        },
        {
            id: "540-gen1",
            name: "BMW 540i",
            generation: "G30",
            years: "2017–2019",
            engine: "B58B30M0",
            engineFamily: "B58",
            engineRevision: "Original B58 / Gen 1",
            transmission: "ZF 8HP50-family",
            startingPrice: 18000,
            drivetrains: ["rwd", "awd"],
            stockWhp: [290, 325],
            traits: {
                cost: 4,
                comfort: 5,
                tuning: 5,
                performance: 4,
                track: 2.5,
                rarity: 1
            },
            builds: [
                plan(1, 400, 1000, 2500, "Pump-gas tune / basic bolt-ons", {
                    hardware: [
                        "ECU tune",
                        "fresh plugs",
                        "optional intake/downpipe where legal"
                    ]
                }),
                plan(2, 500, 2500, 5500, "Full-bolt-on / ethanol-blend setup", {
                    hardware: [
                        "custom tune",
                        "downpipe where legal",
                        "cooling/charge-path service",
                        "fuel-quality support"
                    ]
                }),
                plan(2, 600, 5000, 9000, "600-WHP hybrid-turbo build", {
                    hardware: [
                        "hybrid turbo",
                        "fueling upgrade",
                        "custom tune",
                        "cooling/supporting hardware"
                    ]
                }),
                plan(2, 700, 8000, 14000, "700-WHP turbo + fueling build", {
                    fuel:
                        "Ethanol blend/E85-type fuel commonly required at this level",
                    hardware: [
                        "larger hybrid or single turbo",
                        "HPFP/LPFP and/or port injection",
                        "custom tune",
                        "transmission calibration",
                        "cooling"
                    ]
                }),
                plan(2, 800, 12000, 20000, "800-WHP big-turbo build", {
                    hardware: [
                        "large hybrid/single turbo",
                        "complete fueling",
                        "custom tune",
                        "transmission strategy",
                        "driveline/cooling allowance"
                    ],
                    confidence: "medium-low"
                }),
                plan(2, 900, 18000, 30000, "900-WHP built-supporting-system build", {
                    engineBuild: true,
                    transmissionBuild: true,
                    hardware: [
                        "forged engine budget strongly recommended",
                        "large single turbo",
                        "full fuel system",
                        "built transmission",
                        "axles/driveshaft allowance"
                    ],
                    confidence: "medium-low"
                }),
                plan(
                    2,
                    1000,
                    28000,
                    45000,
                    "1000-WHP forged-engine / built-ZF big-single build",
                    {
                        engineBuild: true,
                        transmissionBuild: true,
                        customOnly: true,
                        fuel: "High-ethanol/race-fuel strategy",
                        hardware: [
                            "forged long block",
                            "1000-WHP-class turbo system",
                            "port injection/full low-side fuel system",
                            "built ZF8",
                            "axles/driveshaft",
                            "cooling",
                            "custom dyno calibration"
                        ],
                        notes:
                            "A 1000-WHP-capable turbo alone is not a complete 1000-WHP build.",
                        confidence: "medium-low"
                    }
                )
            ],
            note:
                "Early G30 540i B58. Verify the exact DME/unlock, emissions hardware, fuel system and transmission by VIN/build date."
        },
        {
            id: "540-tu",
            name: "BMW 540i",
            generation: "G30",
            years: "2020–2023",
            engine: "B58B30M1",
            engineFamily: "B58",
            engineRevision: "B58TU / Gen 2; 2021+ adds 48-V mild hybrid",
            transmission: "ZF 8HP51-family",
            startingPrice: 24000,
            drivetrains: ["rwd", "awd"],
            stockWhp: [295, 330],
            traits: {
                cost: 3.8,
                comfort: 5,
                tuning: 5,
                performance: 4.1,
                track: 2.6,
                rarity: 1
            },
            builds: [
                plan(1, 400, 1000, 2800, "Pump-gas tune / basic bolt-ons"),
                plan(2, 500, 2800, 6000, "Full-bolt-on / ethanol-blend setup"),
                plan(2, 600, 5200, 9500, "600-WHP hybrid-turbo build"),
                plan(2, 700, 8000, 14000, "700-WHP hybrid-turbo + fueling build"),
                plan(2, 800, 12000, 20000, "800-WHP upgraded-turbo build"),
                plan(
                    2,
                    900,
                    18000,
                    30000,
                    "900-WHP big-single / built-supporting-system build",
                    {
                        engineBuild: true,
                        transmissionBuild: true,
                        confidence: "medium-low"
                    }
                ),
                plan(
                    2,
                    1000,
                    28000,
                    46000,
                    "1000-WHP forged-engine / built-ZF big-single build",
                    {
                        engineBuild: true,
                        transmissionBuild: true,
                        customOnly: true,
                        hardware: [
                            "forged engine",
                            "1000-WHP-class turbo",
                            "full low-side + supplemental/port fuel system",
                            "built transmission",
                            "driveline",
                            "cooling",
                            "custom calibration"
                        ],
                        confidence: "medium-low"
                    }
                )
            ],
            note:
                "Do not mix Gen-1 and B58TU turbo/fueling parts. Verify cylinder-head/turbo compatibility, fueling and DME requirements for the exact car."
        },
        {
            id: "m550-tu2",
            name: "BMW M550i xDrive",
            generation: "G30",
            years: "2018–2019",
            engine: "N63B44O2",
            engineFamily: "N63",
            engineRevision: "N63TU2 / N63R",
            transmission: "ZF 8HP75X-family",
            startingPrice: 23000,
            drivetrains: ["awd"],
            stockWhp: [400, 440],
            traits: {
                cost: 2.3,
                comfort: 5,
                tuning: 3.5,
                performance: 3.5,
                track: 2,
                rarity: 2
            },
            builds: [
                plan(1, 600, 1800, 4500, "Tune + bolt-on 600-WHP-class setup"),
                plan(2, 700, 7000, 12000, "Upgraded-turbo 700-WHP build"),
                plan(2, 800, 12000, 21000, "800-WHP custom turbo/fueling build", {
                    confidence: "medium-low"
                }),
                plan(
                    2,
                    900,
                    20000,
                    33000,
                    "900-WHP built-supporting-system N63TU2 build",
                    {
                        engineBuild: true,
                        transmissionBuild: true,
                        customOnly: true,
                        confidence: "low"
                    }
                ),
                plan(2, 1000, 32000, 52000, "1000-WHP forged N63TU2 custom build", {
                    engineBuild: true,
                    transmissionBuild: true,
                    customOnly: true,
                    hardware: [
                        "forged engine",
                        "custom/high-flow turbo system",
                        "complete fueling",
                        "built transmission",
                        "cooling/heat management",
                        "driveline",
                        "custom calibration"
                    ],
                    notes:
                        "Treat this as a custom development project requiring a specialist assessment.",
                    confidence: "low"
                })
            ],
            note:
                "Earlier M550i uses N63TU2. Cooling-system condition and maintenance need their own budget, separate from power modifications."
        },
        {
            id: "m550-tu3",
            name: "BMW M550i xDrive",
            generation: "G30",
            years: "2020–2023",
            engine: "N63B44T3",
            engineFamily: "N63",
            engineRevision: "N63TU3 / T3",
            transmission: "ZF 8HP76X-family",
            startingPrice: 33000,
            drivetrains: ["awd"],
            stockWhp: [460, 500],
            traits: {
                cost: 2,
                comfort: 5,
                tuning: 3.8,
                performance: 4,
                track: 2.5,
                rarity: 2
            },
            builds: [
                plan(1, 600, 1500, 3500, "Tune + supporting bolt-ons"),
                plan(2, 700, 3500, 7500, "700-WHP tune/fueling/supporting build"),
                plan(2, 800, 7000, 13500, "800-WHP upgraded-turbo build"),
                plan(2, 900, 12000, 22000, "900-WHP turbo/fueling/driveline build", {
                    confidence: "medium-low"
                }),
                plan(
                    2,
                    1000,
                    22000,
                    40000,
                    "1000-WHP forged/supporting-system N63TU3 build",
                    {
                        engineBuild: true,
                        transmissionBuild: true,
                        customOnly: true,
                        hardware: [
                            "1000-WHP-class turbo system",
                            "full fuel system",
                            "custom calibration",
                            "transmission build/upgrade allowance",
                            "cooling/heat management",
                            "forged-engine contingency"
                        ],
                        notes:
                            "A complete custom build assessment is required; a turbo upgrade's advertised capacity is not a whole-car guarantee.",
                        confidence: "medium-low"
                    }
                )
            ],
            note:
                "Later M550i uses the revised N63TU3/T3. Its different hardware does not remove the need to inspect cooling, fueling and service history."
        },
        {
            id: "m5-base",
            name: "BMW M5",
            generation: "F90",
            years: "2018–2023",
            engine: "S63B44T4",
            engineFamily: "S63",
            engineRevision: "S63TU4",
            transmission: "ZF 8HP76X M Steptronic / M xDrive",
            startingPrice: 42000,
            drivetrains: ["awd"],
            stockWhp: [540, 590],
            traits: {
                cost: 1.5,
                comfort: 4,
                tuning: 4.5,
                performance: 4.5,
                track: 4.2,
                rarity: 3
            },
            builds: [
                plan(1, 650, 1200, 3200, "Tune + basic supporting mods"),
                plan(2, 750, 3000, 6500, "Ethanol-blend / bolt-on 750-WHP setup"),
                plan(2, 850, 6000, 11000, "Upgraded-turbo / fueling 850-WHP build"),
                plan(2, 900, 8000, 14000, "900-WHP upgraded-turbo build"),
                plan(2, 1000, 12000, 24000, "1000-WHP S63TU4 turbo/fueling build", {
                    hardware: [
                        "1000-WHP-capable turbo pair",
                        "fueling/ethanol strategy",
                        "custom ECU calibration",
                        "transmission calibration",
                        "cooling",
                        "plugs/maintenance baseline"
                    ],
                    notes:
                        "Stock-long-block examples do not establish durability. Engine and transmission rebuild contingencies require separate assessment.",
                    confidence: "medium"
                })
            ],
            note:
                "Factory M starting point. Maintenance, tires, brakes and transfer-case/driveline condition need their own budget."
        },
        {
            id: "m5-comp",
            name: "BMW M5 Competition",
            generation: "F90",
            years: "2019–2023",
            engine: "S63B44T4",
            engineFamily: "S63",
            engineRevision: "S63TU4 — Competition calibration/spec",
            transmission: "ZF 8HP76X M Steptronic / M xDrive",
            startingPrice: 48000,
            drivetrains: ["awd"],
            stockWhp: [560, 610],
            traits: {
                cost: 1.2,
                comfort: 3.7,
                tuning: 4.5,
                performance: 4.8,
                track: 4.7,
                rarity: 3.5
            },
            builds: [
                plan(1, 650, 1200, 3200, "Tune + basic supporting mods"),
                plan(2, 750, 3000, 6500, "Ethanol-blend / bolt-on 750-WHP setup"),
                plan(2, 850, 6000, 11000, "Upgraded-turbo / fueling 850-WHP build"),
                plan(2, 900, 8000, 14000, "900-WHP upgraded-turbo build"),
                plan(2, 1000, 12000, 24000, "1000-WHP S63TU4 turbo/fueling build", {
                    notes:
                        "The Competition trim does not remove the supporting work required for this output.",
                    confidence: "medium"
                })
            ],
            note:
                "Competition changes the factory calibration/chassis specification, but it still uses S63TU4. Assess the actual car's condition and equipment."
        },
        {
            id: "m5-cs",
            name: "BMW M5 CS",
            generation: "F90",
            years: "2022",
            engine: "S63B44T4",
            engineFamily: "S63",
            engineRevision: "S63TU4 — CS calibration/spec",
            transmission: "ZF 8HP76X M Steptronic / M xDrive",
            startingPrice: 115000,
            drivetrains: ["awd"],
            stockWhp: [575, 620],
            traits: {
                cost: 0.5,
                comfort: 2.8,
                tuning: 3.5,
                performance: 5,
                track: 5,
                rarity: 5
            },
            builds: [
                plan(1, 650, 1200, 3200, "Tune + basic supporting mods"),
                plan(2, 750, 3000, 6500, "Ethanol-blend / bolt-on 750-WHP setup"),
                plan(2, 850, 6000, 11000, "Upgraded-turbo / fueling 850-WHP build"),
                plan(2, 900, 8000, 14000, "900-WHP upgraded-turbo build"),
                plan(2, 1000, 12000, 24000, "1000-WHP S63TU4 turbo/fueling build", {
                    notes:
                        "Heavy modification can work against the CS's collectibility. Supporting-system requirements still apply.",
                    confidence: "medium"
                })
            ],
            note:
                "The CS is included as part of the F90 family. Its purchase price and collectibility can make it an expensive starting point for a heavily modified project."
        }
    ];

    // RELIABILITY DATA
    // These cutoffs are editable planning rules, not proven safe limits.
    // Sources document inspection concerns or build context, not the cutoffs.
    const m5Reliability = {
        balancedMaxWhp: 750,
        watch:
            "Check expansion-tank campaign 24E-A01 by VIN and inspect for coolant contamination around injectors.",
        source:
            "https://static.nhtsa.gov/odi/tsbs/2024/MC-11002676-0001.pdf"
    };

    const reliabilityProfiles = {
        "530-17-19": {
            balancedMaxWhp: 300,
            watch:
                "Inspect the oil-filter housing and cooling system for leaks; investigate rough running.",
            source:
                "https://www.reddit.com/r/BmwTech/comments/1symuk0/b46_oil_filter_housing_diy_extras/"
        },
        "530-20-23": {
            balancedMaxWhp: 300,
            watch:
                "Inspect the oil-filter housing and cooling system. Check SIB 11 10 25 applicability for the exact engine.",
            source:
                "https://static.nhtsa.gov/odi/tsbs/2026/MC-11026946-0001.pdf"
        },
        "540-gen1": {
            balancedMaxWhp: 700,
            watch:
                "At higher output, verify turbo, fueling, cooling and a torque plan for the actual gearbox. A turbo's power rating does not establish whole-car durability.",
            source:
                "https://pureturbos.com/products/pure800-new-bmw-b58-gen-1"
        },
        "540-tu": {
            balancedMaxWhp: 700,
            watch:
                "Verify the exact B58TU hardware and gearbox. The 700-WHP category is a provisional policy, not a durability result for this 540i.",
            source:
                "https://www.xautomotive.com/blogs/news/xhp-flash-settings"
        },
        "m550-tu2": {
            balancedMaxWhp: 600,
            watch:
                "Check cooling-system repair history. SIB 17 06 17 covers the N63R G30 produced through May 31, 2018; confirm applicability.",
            source:
                "https://static.nhtsa.gov/odi/tsbs/2022/MC-10230724-9999.pdf"
        },
        "m550-tu3": {
            balancedMaxWhp: 600,
            watch:
                "Inspect for coolant leakage and injector-area contamination. Check SIB 01 17 24 applicability by VIN.",
            source:
                "https://static.nhtsa.gov/odi/tsbs/2024/MC-11012076-0001.pdf"
        },
        "m5-base": m5Reliability,
        "m5-comp": m5Reliability,
        "m5-cs": m5Reliability
    };

    const reliabilityNames = {
        dependable: "Dependability First",
        balanced: "Balanced",
        project: "Project Build",
        unverified: "Unverified"
    };

    // Category order, not a score measuring failure probability.
    const reliabilityRank = {
        dependable: 0,
        balanced: 1,
        project: 2
    };

    function assessReliability(car, build) {
        const profile = reliabilityProfiles[car.id];

        if (!profile) {
            return {
                category: "unverified",
                note: "This car has no researched profile yet.",
                source: null
            };
        }

        let category = "project";

        if (build.level === 0) {
            category = "dependable";
        } else if (
            !build.customOnly &&
            build.whp <= profile.balancedMaxWhp
        ) {
            category = "balanced";
        }

        return {
            category,
            note: profile.watch,
            source: profile.source
        };
    }

    function fitsReliability(car, build, preference) {
        const category = assessReliability(car, build).category;

        return (
            category !== "unverified" &&
            reliabilityRank[category] <= reliabilityRank[preference]
        );
    }

    const levels = {
        stock: 0,
        light: 1,
        major: 2
    };

    const priorityNames = {
        cost: "lower running costs",
        comfort: "daily comfort",
        tuning: "modification potential",
        performance: "factory performance",
        track: "track driving",
        rarity: "collectibility"
    };

    const useNames = {
        daily: "daily driving",
        roll: "closed-course roll events",
        dig: "drag-strip launches",
        both: "roll and drag-strip events",
        track: "circuit track days"
    };

    const money = value => "$" + value.toLocaleString("en-US");

    const moneyRange = (low, high) =>
        low === high ? money(low) : money(low) + "–" + money(high);

    // Checks one car against the user's answers.
    function evaluateCar(car, answers) {
        const reject = reason => ({ car, reason });

        if (answers.budget < car.startingPrice) {
            return reject(
                "Below this profile's " +
                    money(car.startingPrice) +
                    " purchase-price estimate."
            );
        }

        if (
            answers.drivetrain !== "any" &&
            !car.drivetrains.includes(answers.drivetrain)
        ) {
            return reject("Does not match your requested factory drivetrain.");
        }

        const stock = plan(
            0,
            car.stockWhp[1],
            0,
            0,
            "Keep it stock",
            {
                fuel: "BMW-recommended premium fuel",
                confidence: "medium"
            }
        );

        // First filter by modification level.
        const modAllowed = [stock, ...car.builds].filter(
            item => item.level <= levels[answers.mods]
        );

        // Then filter by reliability preference.
        const allowed = modAllowed.filter(
            item => fitsReliability(car, item, answers.reliability)
        );

        if (!allowed.length) {
            return reject(
                "No assessed plan matches your reliability preference."
            );
        }

        if (
            answers.power !== null &&
            modAllowed.some(item => item.whp >= answers.power) &&
            !allowed.some(item => item.whp >= answers.power)
        ) {
            return reject(
                "Your WHP goal exceeds this profile's " +
                    reliabilityNames[answers.reliability] +
                    " planning range."
            );
        }

        const affordable = allowed.filter(
            item => item.low <= answers.modBudget
        );

        let selected = stock;

        if (answers.power !== null) {
            const capable = allowed.filter(
                item => answers.power <= item.whp
            );

            if (!capable.length) {
                return reject(
                    "No " +
                        answers.power +
                        "-WHP plan is modeled for your selected modification level."
                );
            }

            const fits = capable.filter(
                item => item.low <= answers.modBudget
            );

            selected = (fits.length ? fits : capable)
                .sort((a, b) => a.whp - b.whp || a.low - b.low)[0];
        }

        // Future suggestions also obey the reliability filter.
        const upgrade = affordable.reduce(
            (best, item) => item.whp > best.whp ? item : best,
            stock
        );

        const launchUse =
            answers.use === "dig" || answers.use === "both";

        const chosenDrive =
            answers.drivetrain !== "any"
                ? answers.drivetrain
                : car.drivetrains.length === 1
                    ? car.drivetrains[0]
                    : launchUse
                        ? "awd"
                        : "any";

        // Rank the selected build, not an unrelated future upgrade.
        const speed = Math.min(5, selected.whp / 160);

        const useScore = {
            daily: car.traits.comfort,
            roll: speed,
            dig: speed + (chosenDrive === "awd" ? 2 : 0),
            both: speed + (chosenDrive === "awd" ? 1.5 : 0),
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
            score += car.traits.tuning * 0.75;
        }

        if (answers.power !== null) {
            score -= selected.level * 2;
        }

        if (answers.priority === "rarity" && selected.level > 0) {
            score -= 6;
        }

        if (selected.customOnly && answers.priority === "cost") {
            score -= 10;
        }

        if (selected.engineBuild && answers.use === "daily") {
            score -= 4;
        }

        return {
            car,
            selected,
            upgrade,
            chosenDrive,
            score,
            needsQuote: selected.high > answers.modBudget,
            totalLow: car.startingPrice + selected.low
        };
    }

    // Evaluates every car and sorts the remaining matches.
    function recommend(answers) {
        const checked = cars.map(
            car => evaluateCar(car, answers)
        );

        const ranked = checked
            .filter(item => !item.reason)
            .sort(
                (a, b) =>
                    Number(a.needsQuote) - Number(b.needsQuote) ||
                    b.score - a.score ||
                    a.totalLow - b.totalLow
            );

        return {
            matches: ranked,
            excluded: checked.filter(item => item.reason)
        };
    }

    function startPicker() {
        // Adds the dropdown if the HTML does not already contain it.
        if (!document.getElementById("reliability")) {
            const priorityField =
                document.getElementById("priority")?.closest(".field");

            if (priorityField) {
                const field = document.createElement("div");
                field.className = "field";

                const label = document.createElement("label");
                label.htmlFor = "reliability";
                label.textContent = "Reliability Preference";

                const select = document.createElement("select");
                select.id = "reliability";
                select.setAttribute(
                    "aria-describedby",
                    "reliability-help"
                );

                const options = [
                    ["", "Select your reliability preference"],
                    ["dependable", "Dependability First"],
                    ["balanced", "Balanced — Extra Upkeep Is OK"],
                    ["project", "Project Build — Downtime Is OK"]
                ];

                for (const [value, text] of options) {
                    const option = document.createElement("option");
                    option.value = value;
                    option.textContent = text;

                    if (value === "") {
                        option.disabled = true;
                        option.selected = true;
                    }

                    select.appendChild(option);
                }

                const help = document.createElement("small");
                help.id = "reliability-help";
                help.textContent =
                    "Matches engine-specific build estimates; actual vehicle condition needs checking.";

                field.append(label, select, help);
                priorityField.insertAdjacentElement("afterend", field);
            }
        }

        const ids = [
            "budget",
            "priority",
            "mods",
            "power",
            "drivetrain",
            "use",
            "modBudget",
            "reliability"
        ];

        const fields = Object.fromEntries(
            ids.map(id => [id, document.getElementById(id)])
        );

        const button = document.getElementById("find-car");
        const results = document.getElementById("results");
        const missing = ids.filter(id => !fields[id]);

        if (!button || !results || missing.length) {
            console.error(
                "Picker needs the HTML IDs: find-car, results, " +
                    ids.join(", ") +
                    ". Missing: " +
                    missing.join(", ")
            );
            return;
        }

        results.style.gridColumn = "1 / -1";
        results.setAttribute("aria-live", "polite");
        results.setAttribute("tabindex", "-1");

        let hasResults = false;

        // Creates a text element and places it in the results.
        function add(tag, text, parent = results) {
            const element = document.createElement(tag);
            element.textContent = text;
            parent.appendChild(element);
            return element;
        }

        function error(message, id) {
            results.replaceChildren();
            add("p", message);
            fields[id].focus();
            hasResults = false;
            return null;
        }

        // Reads and validates the form fields.
        function readAnswers() {
            const answers = {};

            for (const id of ["budget", "modBudget", "power"]) {
                const input = fields[id];

                if (
                    id === "power" &&
                    input.value.trim() === "" &&
                    !input.validity.badInput
                ) {
                    answers.power = null;
                    continue;
                }

                const value = Number(input.value);
                const minimum = id === "modBudget" ? 0 : 1;

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

            if (answers.power !== null && answers.power > 1000) {
                return error(
                    "This picker is modeled through 1000 WHP. Enter 1000 WHP or less.",
                    "power"
                );
            }

            const choices = {
                priority: Object.keys(priorityNames),
                mods: Object.keys(levels),
                drivetrain: ["any", "rwd", "awd"],
                use: Object.keys(useNames),
                reliability: Object.keys(reliabilityRank)
            };

            for (const [id, options] of Object.entries(choices)) {
                if (!options.includes(fields[id].value)) {
                    const label = {
                        priority: "main priority",
                        mods: "modification level",
                        drivetrain: "drivetrain",
                        use: "main driving use",
                        reliability: "reliability preference"
                    }[id];

                    return error(
                        "Choose your " + label + " first.",
                        id
                    );
                }

                answers[id] = fields[id].value;
            }

            if (
                answers.mods === "stock" &&
                answers.modBudget !== 0
            ) {
                return error(
                    "For 'keep it stock', enter 0 as the modification budget. Or choose a modification level.",
                    "modBudget"
                );
            }

            return answers;
        }

        function addList(title, values, parent) {
            if (!values || !values.length) {
                return;
            }

            add("p", title, parent);

            const ul = document.createElement("ul");
            parent.appendChild(ul);

            values.forEach(
                value => add("li", value, ul)
            );
        }

        // Builds one result card.
        function explain(item, answers, index) {
            const { car, selected, upgrade } = item;

            const article = document.createElement("article");
            results.appendChild(article);

            add(
                "h3",
                (
                    index === 0
                        ? "Top starting point: "
                        : "Also consider: "
                ) + car.name,
                article
            );

            const driveText =
                item.chosenDrive === "awd"
                    ? "Choose xDrive / AWD"
                    : item.chosenDrive === "rwd"
                        ? "Choose RWD"
                        : "RWD or xDrive available";

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
                    car.engineRevision +
                    " · Transmission: " +
                    car.transmission +
                    ".",
                article
            );

            add(
                "p",
                "Purchase starting estimate: " +
                    money(car.startingPrice) +
                    ". Modeled modification allowance: " +
                    moneyRange(selected.low, selected.high) +
                    ".",
                article
            );

            if (selected.level > 0) {
                add(
                    "p",
                    "Car + selected build using the purchase starting estimate: " +
                        moneyRange(
                            car.startingPrice + selected.low,
                            car.startingPrice + selected.high
                        ) +
                        ". Taxes, fees, maintenance and surprise repairs are extra.",
                    article
                );
            }

            add(
                "p",
                "Why it appears: it clears the purchase, drivetrain and reliability-preference filters, then ranks for " +
                    priorityNames[answers.priority] +
                    " and " +
                    useNames[answers.use] +
                    ". " +
                    car.note,
                article
            );

            add(
                "p",
                "Approximate stock dyno screening band: " +
                    car.stockWhp[0] +
                    "–" +
                    car.stockWhp[1] +
                    " WHP. Dynos vary; this is not BMW's factory crank-horsepower rating.",
                article
            );

            // Reliability result and supporting context.
            const reliability = assessReliability(car, selected);

            add(
                "p",
                "Reliability planning fit: " +
                    reliabilityNames[reliability.category] +
                    " — conditional.",
                article
            );

            add("p", reliability.note, article);

            add(
                "p",
                "Vehicle condition: unverified. Requires maintenance records, an inspection and no unresolved faults or leaks. Categories are project estimates, not failure-rate ratings.",
                article
            );

            if (
                selected.level > 0 ||
                (answers.power === null && upgrade.level > 0)
            ) {
                add(
                    "p",
                    "Conditions for any selected or future tuned route: suitable fuel and hardware, reviewed calibration logs, adequate cooling, and a gearbox/torque plan. Track use or repeated launches need a separate assessment.",
                    article
                );
            }

            if (reliability.source) {
                const sourceLine = add("p", "", article);

                const sourceLink = add(
                    "a",
                    "Source for inspection/build context",
                    sourceLine
                );

                sourceLink.href = reliability.source;
            }

            if (answers.power !== null) {
                add(
                    "p",
                    "Your " +
                        answers.power +
                        "-WHP goal maps to: " +
                        selected.label +
                        ". Planning confidence: " +
                        selected.confidence +
                        ".",
                    article
                );

                add(
                    "p",
                    "Fuel/calibration assumption: " +
                        selected.fuel +
                        ".",
                    article
                );

                addList(
                    "Core hardware / work normally budgeted for this route:",
                    selected.hardware,
                    article
                );

                if (selected.engineBuild) {
                    add(
                        "p",
                        "Engine planning: this route includes or strongly budgets for a built/forged engine. A particular engine's durability still requires assessment.",
                        article
                    );
                }

                if (selected.transmissionBuild) {
                    add(
                        "p",
                        "Transmission planning: this route includes a built-transmission/driveline allowance.",
                        article
                    );
                }

                if (selected.customOnly) {
                    add(
                        "p",
                        "Custom-build planning: shop choice, fabrication, fuel, calibration and condition can substantially change the cost and outcome.",
                        article
                    );
                }

                if (selected.notes) {
                    add("p", selected.notes, article);
                }

                if (item.needsQuote) {
                    add(
                        "p",
                        selected.low > answers.modBudget
                            ? "Budget check: this plan starts around " +
                                money(selected.low) +
                                ", above your " +
                                money(answers.modBudget) +
                                " modification budget. This is a stretch match."
                            : "Budget check: your " +
                                money(answers.modBudget) +
                                " covers only part of the build's estimated range. Get an itemized quote before treating it as affordable.",
                        article
                    );
                }
            } else {
                add(
                    "p",
                    "No WHP goal entered: this recommendation starts with a stock car.",
                    article
                );

                if (upgrade.level > 0) {
                    add(
                        "p",
                        "Given your modification level, reliability preference and " +
                            money(answers.modBudget) +
                            " budget, the highest modeled future route whose starting estimate fits is: " +
                            upgrade.label +
                            " (" +
                            moneyRange(upgrade.low, upgrade.high) +
                            ").",
                        article
                    );
                }
            }

            if (answers.use === "track") {
                add(
                    "p",
                    "For circuit use, assess tires, brake fluid/pads, cooling and oil-temperature control before adding power.",
                    article
                );
            }

            if (
                (answers.use === "dig" || answers.use === "both") &&
                selected.whp >= 700
            ) {
                add(
                    "p",
                    "For repeated drag-strip launches at this output, include transfer-case, axle, driveshaft and differential assessment in the build plan.",
                    article
                );
            }

            if (selected.whp >= 900) {
                add(
                    "p",
                    "This is a high-output project requiring a specialist assessment of engine health, fuel delivery, calibration, cooling and drivetrain condition.",
                    article
                );
            }
        }

        function addEngineGlossary() {
            const details = document.createElement("details");
            results.appendChild(details);

            add(
                "summary",
                "B58 / N63 / S63 technical-update (TU) guide",
                details
            );

            for (const [family, entries] of Object.entries(engineGlossary)) {
                add("h4", family.toUpperCase(), details);

                const ul = document.createElement("ul");
                details.appendChild(ul);

                entries.forEach(
                    entry => add("li", entry, ul)
                );
            }
        }

        function addSources() {
            const details = document.createElement("details");
            results.appendChild(details);

            add(
                "summary",
                "Method, pricing basis and sources",
                details
            );

            add(
                "p",
                "Purchase prices and build budgets are broad U.S. planning estimates. Exact costs depend on the car, supporting hardware, labor, maintenance and shop. Power targets require confirmation on the actual build.",
                details
            );

            add(
                "p",
                "Reliability categories are adjustable project rules. Sources document inspection concerns and build context; they do not validate the numeric category cutoffs or predict an individual vehicle's failure rate.",
                details
            );

            const sources = [
                [
                    "BMW: 2017 G30 540i factory technical information",
                    "https://www.press.bmwgroup.com/usa/article/detail/T0264802EN_US/the-all-new-2017-bmw-5-series%3A-performance-redefined"
                ],
                [
                    "BMW: B58TU technical training manual",
                    "https://bmwtechinfo.bmwgroup.com/tech_training_manual/ST1853%20B58TU%20Engine.pdf"
                ],
                [
                    "BMW: G30 LCI technical training manual",
                    "https://bmwtechinfo.bmwgroup.com/tech_training_manual/ST2009%20G30%20LCI%20Complete%20Vehicle.pdf"
                ],
                [
                    "BMW: N63TU technical training manual",
                    "https://bmwtechinfo.bmwgroup.com/tech_training_manual/ST1209%20N63TU%20Engine.pdf"
                ],
                [
                    "BMW: N63TU3 technical training manual",
                    "https://bmwtechinfo.bmwgroup.com/tech_training_manual/ST1854%20N63TU3%20Engine.pdf"
                ],
                [
                    "BMW: S63TU4 technical training manual",
                    "https://bmwtechinfo.bmwgroup.com/tech_training_manual/ST1916%20S63TU4%20Engine.pdf"
                ],
                [
                    "BimmerWorld: BMW engine/chassis code reference",
                    "https://www.bimmerworld.com/About-Us/BMW-Chassis-Engine-Codes/"
                ],
                [
                    "BimmerWorld: B46/B58 vs B46TU/B58TU",
                    "https://www.bimmerworld.com/BMW-B46TU-B58TU-Differences/"
                ],
                [
                    "BimmerWorld: N63 engine variants",
                    "https://www.bimmerworld.com/About-Us/BMW-N63-Engine-Variations/"
                ],
                [
                    "ECS: G30 540i turbo upgrade examples",
                    "https://www.ecstuning.com/BMW-G30-540i-B58_3.0L/Engine/Turbocharger/Performance/"
                ],
                [
                    "ECS: G30 M550i turbo upgrade examples",
                    "https://www.ecstuning.com/BMW-G30-M550i_xDrive-N63_4.4L/Engine/Turbocharger/Performance/"
                ],
                [
                    "Turner: F90 M5 turbo upgrade examples",
                    "https://www.turnermotorsport.com/BMW-F90-M5/c-596-bmw-turbo-upgrades"
                ],
                [
                    "RK Autowerks: S63 engine-build reference",
                    "https://www.rkautowerks.com/wp-content/uploads/2020/06/S63-Engine-Build-Process-FAQ-0124.pdf"
                ]
            ];

            const list = document.createElement("ul");
            details.appendChild(list);

            sources.forEach(([label, url]) => {
                const row = document.createElement("li");
                const link = add("a", label, row);

                link.href = url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                list.appendChild(row);
            });
        }

        // Runs when the user clicks the recommendation button.
        button.addEventListener("click", () => {
            const answers = readAnswers();

            if (!answers) {
                return;
            }

            const { matches, excluded } = recommend(answers);

            results.replaceChildren();

            add(
                "h2",
                matches.length
                    ? "Your 5 Series matches"
                    : "No estimated match for all your answers"
            );

            add(
                "p",
                "Purchase budget: " +
                    money(answers.budget) +
                    " · Modification budget: " +
                    money(answers.modBudget) +
                    " · WHP goal: " +
                    (answers.power ?? "Not specified") +
                    " · Reliability preference: " +
                    reliabilityNames[answers.reliability]
            );

            add(
                "p",
                "Planning estimates only. Exact dyno output, installed cost and durability depend on the actual vehicle and build."
            );

            if (matches.length) {
                matches.forEach(
                    (item, index) => explain(item, answers, index)
                );
            } else {
                add(
                    "p",
                    "Review the exclusions below. Your budgets, power goal, modification level, drivetrain or reliability preference may need adjusting."
                );
            }

            if (answers.drivetrain === "rwd") {
                add(
                    "p",
                    "RWD means a factory RWD car. F90 M5 models remain classified as AWD even though M xDrive provides a selectable 2WD mode."
                );
            }

            if (excluded.length) {
                const details = document.createElement("details");
                details.open = matches.length === 0;
                results.appendChild(details);

                add(
                    "summary",
                    "Why other model/year profiles were excluded",
                    details
                );

                const list = document.createElement("ul");
                details.appendChild(list);

                excluded.forEach(item => {
                    add(
                        "li",
                        item.car.name +
                            " (" +
                            item.car.years +
                            ", " +
                            item.car.engineRevision +
                            "): " +
                            item.reason,
                        list
                    );
                });
            }

            addEngineGlossary();
            addSources();

            hasResults = true;
            results.focus();
        });

        // Prevents old results from looking current after an answer changes.
        ids.forEach(id => {
            fields[id].addEventListener("input", () => {
                if (hasResults) {
                    results.replaceChildren();

                    add(
                        "p",
                        "Answers changed. Click Find My 5 Series to update your matches."
                    );

                    hasResults = false;
                }
            });
        });

        // Lets Enter submit from the number fields.
        ["budget", "power", "modBudget"].forEach(id => {
            fields[id].addEventListener("keydown", event => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    button.click();
                }
            });
        });
    }

    // Waits until the HTML is available before connecting the picker.
    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            startPicker,
            { once: true }
        );
    } else {
        startPicker();
    }
})();

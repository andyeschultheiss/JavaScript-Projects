
function carDictionary() {
    var car1 = {
        Make: "Alfa Romeo",
        Model: "Giulia Quadrifoglio",
        Year: 2019,
        Doors: 4,
        EngineType: "V6 Twin Turbo",
        DriveWheels: "AWD",
    };

    var car2 = {
        Make: "BMW",
        Model: "M3",
        Year: 2016,
        Doors: 4,
        EngineType: "Inline 6 Twin Turbo",
        DriveWheels: "RWD",
    };

    var car3 = {
        Make: "Acura",
        Model: "RSX",
        Year: 2003,
        Doors: 2,
        EngineType: "Inline 4",
        DriveWheels: "FWD",
    };
    
    document.getElementById("Dictionary").innerHTML = "The model year of the " + car3.Make + " " + car3.Model + " is of type "
                                                      + typeof(car3.Year);

    document.getElementById("Comparison").innerHTML = "The " + car1.Make + " " + car1.Model + " is newer than the " + 
                                                        car3.Make + " " + car3.Model + ": " + (car1.Year > car3.Year);

    document.getElementById("BoolComparison").innerHTML = "The " + car1.Make + " " + car1.Model + " has an equal number of doors as the "
                                                            + car2.Make + " " + car2.Model + ": " + (car1.Doors == car2.Doors);
    
    document.getElementById("TripComparison").innerHTML = "The " + car1.Make + " " + car1.Model + " has the same type of engine as the "
                                                            + car2.Make + " " + car2.Model + ": " + (car1.EngineType === car2.EngineType); 

    document.getElementById("BoolOpComp").innerHTML = (car1.Doors === car2.Doors) + " " + (car1.DriveWheels === car2.DriveWheels)
                                                        + " " + (car1.Doors === car3.Year);

    document.getElementById("LogOpComp").innerHTML = ((car1.Doors == car2.Doors) && (car1.Year > car2.Year)) + ", " + ((car1.Doors < car2.Doors) || (car1.Year > car2.Year))
                                                         + ", " + ((car1.Doors == car2.Doors) && !(car1.Year > car2.Year)) + ", " + !(car3.Year < car2.Year);
}

 

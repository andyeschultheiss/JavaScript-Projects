
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

    delete car2.Make;
    
    document.getElementById("Dictionary").innerHTML = "The " + car2.Year + " " + car2.Make + " " + car2.Model +
                                                      " comes standard with an " + car2.EngineType;
    
}

 

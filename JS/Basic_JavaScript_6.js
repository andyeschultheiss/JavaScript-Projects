
function Computer(Make, Model, CPU_GHz, RAM_GB, HDD_GB) {
    this.Computer_Make = Make;
    this.Computer_Model = Model;
    this.Computer_CPU_GHz = CPU_GHz;
    this.Computer_RAM_GB = RAM_GB;
    this.Computer_HDD_GB = HDD_GB;
    this.addRAM = function (GB_RAM_Added) { 
        this.Computer_RAM_GB += GB_RAM_Added;
    }

}

var Andy = new Computer("HP", "Envy x360", 3.6, 16, 512);
var Allison = new Computer("Apple", "MacBook Air", 1.8, 2, 128);
var Ed = new Computer("Lenovo", "ThinkPad", 3.2, 4, 256);
Allison.addRAM(4);

function computerDisplayFunction() {
    document.getElementById("New_and_This").innerHTML =
    "Andy has a computer built by " + Andy.Computer_Make + " with a " + 
    Andy.Computer_CPU_GHz + " GHz processor and " + Andy.Computer_RAM_GB +
    " GB of RAM.";

    document.getElementById("Nested_Function").innerHTML =
    "After upgrading, Allison's computer has " + Allison.Computer_RAM_GB +
    " GB of RAM.";
    
}
    
 

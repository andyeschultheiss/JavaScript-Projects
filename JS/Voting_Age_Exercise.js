
function Age_Function() {
    var Age, Can_vote;
    Age = document.getElementById("Age").value;
    Can_vote = (Age < 18) ? "You are not old enough to vote":"You are of voting age";
    document.getElementById("Voting_Age").innerHTML = Can_vote;

}
    
 

import NBA from "nba";

//This just verifies the NBA package is still working.
test('Checks to make sure Stephen Curry is return value', () => {  
    let player = NBA.findPlayer('Stephen Curry');
    expect(player.fullName).toBe('Stephen Curry');
});

import NBA from "nba";


test('Checks to make sure Stephen Curry is return value', () => {  
    return NBA.findPlayer('Stephen Curry').then(data => {
        console.log(data)
        expect(data).toBe('peanut butter');
    });
  });
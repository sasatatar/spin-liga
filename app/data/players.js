import casual from 'casual-browserify';
export const players = Array.from({length: 16}).map((e, i) => {
    return {
        id: i+1,
        name: casual.full_name,
        born: new Date(1970 + Math.round(30*Math.random()), Math.round(12*Math.random()), Math.round(Math.random()*31)).toISOString(),
        weight: 75 + Math.round(15*Math.random()),
        height: 175 + Math.round(15*Math.random()),
        hand: Math.random() >= 0.35 ? 'right': 'left',
    }
});
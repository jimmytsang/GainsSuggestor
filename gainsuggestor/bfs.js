let graph = {
    0: [1,3],
    1: [2,0],
    2: [1],
    3: [0,7,4],
    4: [7,6,3,5],
    5: [6,4],
    6: [4,7,5],
    7: [6,4,3]
};

function calculateShortestDistance(start,end,graph) {
    let queue = [];
    let visited = new Set();
    let distances = [];
    queue.push(start);
    visited.add(start);
    distances[start] = 0;
    if (start === end) return distances[start];
    while(queue.length > 0) {
        let node = queue.shift();
        let neighbors = graph[node];
        for(let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                distances[neighbor] = 1 + distances[node];
                visited.add(neighbor);
                queue.push(neighbor);
                if (neighbor === end) {
                    return distances[neighbor];
                }
            }
        }
    }
    return -1;
};

console.log(calculateShortestDistance(0, 6, graph));
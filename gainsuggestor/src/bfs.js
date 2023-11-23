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

// start = 0
// distances[node] = 1 + distances[nodeParent]
// let distances = [
//     0: 0,
//     1: 1+distances[0],
//     3: 1+distances[0],
//     2: 1+distances[1],
//     7: 1+distances[3],
//     ...
    
// ];

function calculateShortestDistance(start,end,graph) {
    let queue = [];
    queue.push(start);
    let distance = [];
    distance[start] = 0;
    let visisted = new Set();
    
    while(queue.length > 0){
        let currNode = queue[0];
        let neighbors = graph[currNode];
        if(currNode === end){
            return distance[currNode];
        }
        
        for(let i = 0; i < neighbors.length; i++){
            if(!visisted.has(neighbors[i])){
                queue.push(neighbors[i]);
                visisted.add(neighbors[i]);
                distance[neighbors[i]] = 1 + distance[currNode];
            }
        }
        
        queue.shift();               
    }
    return -1;
};

console.log(calculateShortestDistance(0, 22 , graph));
// calculateShortestDistance(0,0,graph); -> 0
// calculateShortestDistance(0,1,graph); -> 1
// calculateShortestDistance(0,2,graph); -> 2
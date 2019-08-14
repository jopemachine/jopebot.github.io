---
layout: post
title: "<안녕, 티라노: 영원히, 함께> 패밀리시사회"
subtitle: '2019-07-02, 2회차 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 모각코
---

<i>Posting Time : 19-07-02, 19:04</i><br>
<i>Updating Time : 19-07-02, 19:04</i><br>

---

오늘 모각코 모임에서 풀려고 시도헤 본 문제는 아래 2문제였다.

<hr>

<h2>1753번 - 최단경로</h2>

![](/img/posts/2019-07-02-Mogacko02_Result/ScreenClip01.png)

다익스트라 알고리즘을 활용해 각 정점에서의 최단 경로를 찾는 문제이다.

C++ std의 우선순위 큐를 Min Heap으로 이용해 BFS 하면 한 정점에서 다른 정점까지의 최단 거리를 구할 수 있다.

모임 전 다익스트라 알고리즘을 공부하고, 비슷한 유형인 1916번 문제를 풀었으니 쉽게 풀릴 것이라 생각하고 코드를 짰지만,

메모리 초과 문제 때문에 아직 해결하지 못했다.

{% highlight cpp %}

// V: 정점의 갯수, K: 간선의 갯수
// (1≤V≤20,000, 1≤E≤300,000)
int V, K;
int startVertex;

// First: 가중치 (cost), Second: 정점 ID
// Min Heap으로 쓰기 위해 greater를 사용
priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pQue;

void solve_Dijkstra(int s, int** map, int* costs){

    pQue.push({0, s});

    while(pQue.size() > 0){

        int vertexID = pQue.top().second;
        int cost = pQue.top().first;

        pQue.pop();

        // 최단거리가 이미 정해진 곳
        if(costs[vertexID] != -1){
            continue;
        }

        costs[vertexID] = cost;

        // 인접 점들을 검사
        for(int i = 0; i < V; i++){

            if(map[vertexID][i] >= 0){

                int totalCost = map[vertexID][i] + costs[vertexID];

                // 최단거리가 이미 정해진 곳
                if(costs[i] != -1){
                    continue;
                }

                pQue.push({totalCost, i});
            }
        }
    }
}

{% endhighlight %}

<br>
<hr>

<h2>4963번 - 섬의 개수</h2>

입력을 이차원 배열에 담고, BFS를 통해 완전 탐색해, 섬의 갯수를 세려고 했다. 

이 문제는 섬이 되기 위한 조건으로 대각선 방향도 포함하고 있어

while 문 내부에서 총 8개의 방향을 확인하며 섬의 갯수를 세야 하는 점에서 4개의 방향으로 순회하는 bfs 들과는 조금 달랐다.

아래 코드는 해당 조건에서의 BFS를 구현한 함수이다.

{% highlight cpp %}

bool solve_byBFS(pair<int, int> startVertex, int** map, int** dist){

    bool isIsland = false;

    dist[startVertex.second][startVertex.first] = 1;

    que.push(startVertex);

    while(que.size() > 0){

        int row = que.front().first;
        int col = que.front().second;

        // 오른쪽 방향으로 bfs
        if ((row + 1 < W && row >= 0) && map[col][row + 1] == 1 && dist[col][row + 1] < 0) {
            que.push(make_pair(row + 1, col));
            dist[col][row + 1] = dist[col][row] + 1;
            isIsland = true;
        }
        // 아래 방향으로 bfs
        if ((col + 1 < H && col >= 0) && map[col + 1][row] == 1 && dist[col + 1][row] < 0) {
            que.push(make_pair(row, col + 1));
            dist[col + 1][row] = dist[col][row] + 1;
            isIsland = true;
        }
        // 왼쪽 방향으로 bfs
        if (row - 1 >= 0 && map[col][row - 1] == 1 && dist[col][row - 1] < 0) {
            que.push(make_pair(row - 1, col));
            dist[col][row - 1] = dist[col][row] + 1;
            isIsland = true;
        }
        // 위쪽 방향으로 bfs
        if (col - 1 >= 0 && map[col - 1][row] == 1 && dist[col - 1][row] < 0) {
            que.push(make_pair(row, col - 1));
            dist[col - 1][row] = dist[col][row] + 1;
            isIsland = true;
        }

        // 2시 방향으로 bfs (위쪽 방향이면서 오른쪽 방향)
        if(col - 1 >= 0 && (row + 1 < W && row >= 0) && map[col - 1][row + 1] == 1 && dist[col - 1][row + 1] < 0){
            que.push(make_pair(row + 1, col - 1));
            dist[col - 1][row + 1] = dist[col][row] + 1;
            isIsland = true;
        }

        // 4시 방향으로 bfs (아래쪽 방향이면서 오른쪽 방향)
        if((col + 1 < H && col >= 0) && (row + 1 < W && row >= 0) && map[col + 1][row + 1] == 1 && dist[col + 1][row + 1] < 0){
            que.push(make_pair(row + 1, col + 1));
            dist[col + 1][row + 1] = dist[col][row] + 1;
            isIsland = true;
        }

        // 7시 방향으로 bfs (아래쪽 방향이면서 왼쪽 방향)
        if((col + 1 < H && col >= 0) && row - 1 >= 0 && map[col + 1][row - 1] == 1 && dist[col + 1][row - 1] < 0){
            que.push(make_pair(row - 1, col + 1));
            dist[col + 1][row - 1] = dist[col][row] + 1;
            isIsland = true;
        }

        // 11시 방향으로 bfs (위쪽 방향이면서 왼쪽 방향)
        if(col - 1 >= 0 && row - 1 >= 0 && map[col - 1][row - 1] == 1 && dist[col - 1][row - 1] < 0){
            que.push(make_pair(row - 1, col - 1));
            dist[col - 1][row - 1] = dist[col][row] + 1;
            isIsland = true;
        }

        que.pop();
    }

    return isIsland;
}

{% endhighlight %}

그 외 오늘은 노트북에 Ruby가 설치되어 있지 않아서 깃허브 페이지를 로컬에서 관리하기 위해

노트북 윈도우에 루비를 설치하고 Jekyll 개발환경을 구축했다.

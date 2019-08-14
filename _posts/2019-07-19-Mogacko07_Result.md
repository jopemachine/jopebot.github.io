---
layout: post
title: "주전장은 바로 지금 이 땅에서! 우리가 해야한다. "
subtitle: '2019-07-19, 7회차 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 모각코
---

<i>Posting Time : 19-07-19, 16:46</i><br>
<i>Updating Time : 19-07-19, 16:46</i><br>

---

<h2>기수정렬 (Radix Sort)</h2>

오늘 제일 먼저 한 것은 기수정렬에 대한 공부이다.

기수 정렬은 가장 낮은 자리 수 부터 하나씩 자리수를 정렬해 나가는 정렬로,

(가장 높은 자릿 수 부터 정렬하는 경우, MSD 라고 부른다.)

실수나 객체 (자릿수가 없는) 엔 적용할 수 없는 비교적 특수한 정렬이며, 정수와 문자열에만 사용할 수 있다.

비교정렬이 아니기 때문에, O(nlog n) 보다 더 나은 시간복잡도를

갖고 있다. 예를 들어 가장 큰 자릿 수가 세 자리 수라면 전체 리스트를 세 번 훑어야 하기 때문에 O ( 3n )이 된다.

자리 수를 d로 놓고 일반화 시키면, O ( dn ) 의 시간 복잡도를 갖는다. 

기수정렬은 또한, 안정정렬에 속한다고 한다.

아래 사이트에서 시뮬레이션을 돌려보면서 공부하니, 좀 더 빨리 알고리즘에 대해 이해할 수 있었다.

https://www.cs.usfca.edu/~galles/visualization/RadixSort.html

![](/img/posts/2019-07-19-Mogacko07_Result/ScreenClip.png)

<br>

<h2>감정 분석값에 따른 CSS 스타일 적용 (PHP)</h2>

PHP 코드로 감정 분석 결과 값에 따라, 스타일이 적용되게 comment.php 코드를 변경했다. 이 값은 -50 ~ 50 사이의 값이며,

-50에 가까울 수록 부정일 확률이 높고, 50에 가까울 수록 긍정일 확률이 높음을 나타낸다.

해당 변경한 코드는 아래와 같다. (해당 코드 중 변경한 부분만 올림)

{% highlight php %}

// 댓글의 긍정도에 따라, class를 달리 붙임.
      $positiveClass = "";

      if($Positiveness < 0){
        switch((int)((-1) * $Positiveness / 10)){
          case 0:
            $positiveClass = "comment-negative01";
            break;
          case 1:
            $positiveClass = "comment-negative02";
            break;
          case 2:
            $positiveClass = "comment-negative03";
            break;
          case 3:
            $positiveClass = "comment-negative04";
            break;
          case 4:
            $positiveClass = "comment-negative05";
            break;
        }
      }
      else if($Positiveness > 0){
        switch((int) ($Positiveness / 10)){
          case 0:
            $positiveClass = "comment-positive01";
            break;
          case 1:
            $positiveClass = "comment-positive02";
            break;
          case 2:
            $positiveClass = "comment-positive03";
            break;
          case 3:
            $positiveClass = "comment-positive04";
            break;
          case 4:
            $positiveClass = "comment-positive05";
            break;
        }
      }
      // 긍정도 값이 셋팅되지 않은 경우
      else {
        $positiveClass = "comment-neutral";
      }

{% endhighlight %}

<h2>바텀업 프로젝트 셋팅</h2>

쟝고 서버 (감정 분석값을 전달) 의 주소를 emotionanalysisservice.ga 도메인으로 등록하고, cloudflare 서비스를 이용해

https 프로토콜 인증을 해 놓았다. 

시간이 모자라 디자인 패턴 복습을 못 한 것이 아쉬웠다.

집에가서 따로 복습하는 시간을 가져야겠다.



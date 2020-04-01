---
layout: post
title: "2019 모각코 6회차 결과"
subtitle: '2019-07-16, 6회차 2019 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 2019 모각코
---

오늘 제일 먼저 한 일은 스마트폰에서도 댓글 컴포넌트를 용이하게 이용할 수 있도록 css 스타일 등을 약간 변경한 것이다.

그 다음 한 일은 Comment.php 파일 내 Comment 클래스가 생성자의 인자 순서를 너무 알기 어려워 

(특히 일부 1개 이상의 인자에 null이 포함될 때 코드 의미를 파악하기 어려워진다.)

이대로 Comment Class를 계속 사용하면 코드가 점점 난잡해질 것 같아 빌더 패턴을 사용해 코드를 다듬으려 해 봤다.

리팩토링한 코드는 아래와 같다.

{% highlight php %}

<?php

// DB의 Comment 레코드 하나를 담기 위한 클래스
class Comment{
  public $CommentUserId;
  public $Content;
  public $DateTime;
  public $ProfileImageFileName;
  public $PageID;
  public $URL;
  public $PostTitle;

  // 아무일도 하지 않는 생성자
  function __construct(){}
}

class CommentBuilder{

  // Comment 객체
  public $comment;

  // Comment 객체를 인자로 받음
  function __construct($_comment){
    $this->comment = $_comment;
  }

  public function build(){
    return $this->comment;
  }

  function setCommentUserID($_CommentUserId){
    $this->comment->CommentUserId = $_CommentUserId;
    return $this;
  }

  function setContent($_Content){
    $this->comment->Content = $_Content;
    return $this;
  }

  function setDateTime($_DateTime){
    $this->comment->DateTime = $_DateTime;
    return $this;
  }

  function setProfileImageFileName($_ProfileImageFileName){
    $this->comment->ProfileImageFileName = $_ProfileImageFileName;
    return $this;
  }

  function setPageID($_PageID){
    $this->comment->PageID = $_PageID;
    return $this;
  }

  function setURL($_URL){
    $this->comment->URL = $_URL;
    return $this;
  }

  function setPostTitle($_PostTitle){
    $this->comment->PostTitle = $_PostTitle;
    return $this;
  }

}

{% endhighlight %}

위 리팩토링된 Comment 클래스 및 CommentBuilder를 사용해 다듬은 RecentComments.php 파일은 아래와 같다.

파일이 다소 길어 comment 객체 생성과 빌더 패턴에 관한 코드만 가져왔다.

{% highlight php %}

    $pq->insert(
      $commentBuilder
      ->setCommentUserID($comment['CommentUserId'])
      ->setContent($comment['Content'])
      ->setDateTime($comment['DateTime'])
      ->setProfileImageFileName($comment['ProfileImageFileName'])
      ->setPageID($TitleAndPageID['PageID'])
      ->setURL($tableName[0])
      ->setPostTitle($TitleAndPageID['Title'])
      ->build()
    ), $weight);

{% endhighlight %}

그 외 긍정적인 댓글이 많았던 순으로 (평균치를 이용) 8개의 상위 항목을 추려내는 서비스를 제공하기 위해

아래와 같은 php 파일을 작성했다. 

아래 코드는 기존에 작성해 두었던 PostsSortingByCommentsNumber.php와 겹치는 부분이 많아 조금만 수정해 금방 작성할 수 있었다.

반면 PostsSortingByCommentsNumber (댓글이 많이 달린 게시물)의 경우, 막대 그래프를 이용해 나타내려 했던 것을

원형 차트를 이용하여 나타내도록 변경해야겠다.

{% highlight php %}

<?php
// 각 테이블 내 레코드들의 긍정, 부정 정도를 평균을 내서 상위 랭킹 10개 정도를 뽑아, 막대 그래프로 나타내자.
session_start();

$UserID = $_SESSION['user_id'];

// 세션에 ID가 없다면, 이용할 수 없으니, SignIn 페이지로 이동
if(!isset($UserID)){
  echo ("<script language=javascript>alert('먼저 로그인하세요!')</script>");
  echo ("<script>location.href='../SignIn.php';</script>");
  exit();
}

$URLID = $_POST['URLID'];

require_once('../MySQLConection.php');

class Post{
  public $PostTitle;
  public $Positiveness;

  function __construct($_PostTitle, $_Positiveness){
    $this->PostTitle = $_PostTitle;
    $this->Positiveness = $_Positiveness;
  }
}

class Positiveness{

  public static function WarnNoComments(){

    return sprintf('
      <div class="alert alert-success alert-dismissible fade show">
        <button type="button" class="close" aria-label="Close" data-dismiss="alert">
          <span aria-hidden="true">&times;</span>
        </button>
        <p id="NoCommentsWarning" class="lead" style="font-size: 14px; color: #4c4c4c;">블로그에 등록된 댓글이 없습니다.</p>
      </div>
    ');
  }
}

$connect_object = MySQLConnection::DB_Connect($URLID) or die("Error Occured in Connection to DB");

// show tables로 모든 테이블 이름을 가져온다.
$showTables = '
  SHOW TABLES
';

$allTableName = mysqli_query($connect_object, $showTables);

// 긍정 평균치를 가중치로 하는 우선순위 큐
$pq = new SplPriorityQueue();

while($tableName = mysqli_fetch_array($allTableName)){

  if($tableName[0] == 'pagetitlepairs' || $tableName[0] == 'visitorcounter') continue;

  $selectTitle = "
    SELECT Title FROM pagetitlepairs WHERE PageID = '$tableName[0]'
  ";

  // 평균을 따로 구할 필요 없이 MySQL 내장 함수로 평균 값을 조회할 수 있다.
  $calcPositivenessAvg = "
    SELECT AVG(EmotionalAnalysisValue) FROM `" . $tableName[0] . "`";

  $selectTitleRet = mysqli_query($connect_object, $selectTitle) or die("Error Occured in selecting Title");
  $calcPositivenessAvgRet = mysqli_query($connect_object, $calcPositivenessAvg) or die("Error Occured in calcPositivenessAvg");

  $positivenessValueAvg = mysqli_fetch_array($calcPositivenessAvgRet);
  $title = mysqli_fetch_array($selectTitleRet);

  $pq->insert(new Post($title[0], $positivenessValueAvg[0]), $positivenessValueAvg[0]);
}

// DB에 따로 테이블로 두긴 양이 너무 적어 (10개로 고정) 코드에 넣었다
$backgroundColors = "
  rgba(255, 99, 132, 0.2)|
  rgba(54, 162, 235, 0.2)|
  rgba(255, 206, 86, 0.2)|
  rgba(75, 192, 192, 0.2)|
  rgba(226, 255, 163, 0.2)|
  rgba(168, 196, 255, 0.2)|
  rgba(211, 140, 255, 0.2)|
  rgba(240, 92, 242, 0.2)|
  rgba(57, 250, 215, 0.2)|
  rgba(219, 219, 219, 0.2)|
";

$borderColors = "
  rgba(255, 99, 132, 1)|
  rgba(54, 162, 235, 1)|
  rgba(255, 206, 86, 1)|
  rgba(75, 192, 192, 1)|
  rgba(226, 255, 163, 1)|
  rgba(168, 196, 255, 1)|
  rgba(211, 140, 255, 1)|
  rgba(240, 92, 242, 1)|
  rgba(57, 250, 215, 1)|
  rgba(219, 219, 219, 1)|
";

$backgroundColorsArr = explode('|', preg_replace("/\s+/","", $backgroundColors));
$borderColorsArr = explode('|', preg_replace("/\s+/","", $borderColors));

// 우선순위큐가 빌 때 까지 꺼냄
$index = 0;

$labels = '';
$data = '';
$backgroundColorStr = '';
$borderColorsStr = '';

while($pq->valid()){

  if($index >= 8) break;

  $iterator = $pq->current();
  $labels .= '\''. $iterator->PostTitle . '\',';
  $backgroundColorStr .= '\''. $backgroundColorsArr[$index] . '\',';
  $borderColorsStr .= '\''. $borderColorsArr[$index] . '\',';
  $data .= $iterator->Positiveness . ',';
  $pq->next();
  $index++;
}

// ChartJS 스크립트를 전송해, 해당 화면에 차트를 띄운다.
$barGraphScipts = sprintf("
  <script>
  var ctxB = document.getElementById(\"bar-graph\").getContext('2d');
  var myBarChart = new Chart(ctxB, {
      type: 'bar',
      data: {
          labels: [%s],
          datasets: [{
              label: '좋은 평가를 받은 게시글 순으로 정렬',
              data: [%s],
              backgroundColor: [%s],
              borderColor: [%s],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  </script>",
  $labels, $data, $backgroundColorStr, $borderColorsStr);


echo sprintf('
  <div class="list-group">
    <a class="list-group-item active" style="background-color: #474747!important; color: #ffffff; border: none !important;">댓글이 많이 달린 게시글</a>
    <div class="list-group-item">
      <canvas id="bar-graph"></canvas>
      %s
    </div>
  </div>
  ', $barGraphScipts);
{% endhighlight %}

Popular Posting 서비스 코드도 작성해야 하는데, 서버를 테스트 해 볼 수가 없어, 아직 세션 버그를 고치지 못했다.

왜 인지 모르겠지만, ajax로 php를 실행해 저장해놓은 세션 값이 분실되는 버그가 있어, 방문자를 제대로 카운팅하지

못하고 있기 때문에, Popular Posting 및 Visitor 서비스는 나중에 작성해야 겠다.

그 외 오늘은 학과에서 지원해주기 떄문에, 인프런에서 들을 강의를 몇 개 찾아보았다.



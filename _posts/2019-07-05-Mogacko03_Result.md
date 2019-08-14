---
layout: post
title: "여름방학 꿀잼 애니메이션 영화 <원더랜드>"
subtitle: '2019-07-05, 3회차 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 모각코
---

<i>Posting Time : 19-07-05, 16:56</i><br>
<i>Updating Time : 19-07-05, 16:56</i><br>

---

<h2>Post Comment - Javascript</h2>

오늘 제일 먼저 작성한 것은 클라이언트 측에서 댓글 작성 버튼을 클릭했을 때 서버로 전송하는 javascript 파일 내 함수이다.

{% highlight js %}

// 제출 버튼을 클릭해 댓글을 달 때 실행되는 함수
function postComment(){

  var userID = $.cookie('connectedUserID');
  var profileImageFileName = $.cookie('profileImageFileName');

  // 로그인 되어 있지 않은 경우 우선 로그인을 권유하는 알림을 띄운다
  if(userID == null && !($('#recommendLoginAlert').is(":visible"))){
    $('#recommendLoginAlert').show();
    return;
  }

  // 위 상태에서 한 번 더 제출 버튼을 클릭하면 익명으로 댓글을 남기기 위해,
  // UserID에 Anonymous (익명)을 저장한다
  // 댓글 등록 시간은 클라이언트가 보내는 시간이 아니라, DB에 저장되는 시간으로 저장한다.
  // profileImageFileName의 Null 처리는 여기서 하지 않음에 주의. 
  if(userID == null){
    userID = 'Anonymous';
  }

  // url을 PHP로 넘겨야 하기 때문에 주소 값을 파싱해서 파라미터 값을 php로 전송해야 한다

  $.ajax({
    type: "POST",
    url : "../php-Action/AddComment.php",
    data: {
      userID : userID,
      commentContent : $('#CommentArea').val(),
      urlID : getParameterByName('db'),
      pageID : getParameterByName('pageID'),
      profileImageFileName : profileImageFileName
    },

    success : function(data, status, xhr) {
      console.log("서버로 채팅 데이터 전송 성공" + data);

    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Ajax 전송에 실패했습니다!" + jqXHR.responseText);
    }
  });
}

{% endhighlight %}


<br>
<hr>

<h2>Post Comment - PHP</h2>

그 다음 작성한 것은 Post 방식으로 전송된 데이터를 처리하는 PHP 코드이다.

{% highlight php %}

<?php

$UserID = $_POST['userID'];
$CommentContent = $_POST['commentContent'];
$URLID = $_POST['urlID'];
$PageID = $_POST['pageID'];
$ProfileImageFileName = $_POST['profileImageFileName'];

$connect_object = MySQLConnection::DB_Connect($URLID);

// 해당 DB의 페이지 ID 테이블에 새 레코드 입력
$insertComment = "
  Insert INTO '" . $PageID . "'(
    CommentUserId,
    Content,
    DateTime,
    ProfileImageFileName
    ) VALUES(
    '$UserID',
    '$CommentContent',
    Now(),
    '$ProfileImageFileName'
)";

$ret = mysqli_query($connect_object, $insertComment);
{% endhighlight %}

<br>
<hr>

<h2>Delete Comment - PHP</h2>

댓글을 삭제하는 PHP 코드이다. 프론트에서 삭제 버튼을 누르면 PHP에서 아래 코드를 실행해 DB에서 해당 댓글 레코드를 삭제한다.

{% highlight php %}
<?php

// CommentID는 Auto Index로, 삭제하고 다시 insert해도 중복된 값이 들어가지
// 않으므로 ID 값으로 쓸 수 있음.
$UserID = $_POST['userID'];
$CommentID = $_POST['CommentID'];
$URLID = $_POST['urlID'];
$PageID = $_POST['pageID'];

$connect_object = MySQLConnection::DB_Connect($URLID);

// CommentID와 같은 레코드를 삭제한다.
$selectComment = "
  SELECT FROM '" . $PageID . "' WHERE CommentID ='$CommentID'
";

$ret = mysqli_query($connect_object, $selectComment);

$row = mysqli_fetch_array($ret);

// User ID가 Comment User ID와 다를 경우 댓글을 삭제할 수 없게 한다.
// 이미 지워진 댓글을 시도하려고 하는 경우 역시 아무 행동도 취하지 않는다.
if(empty($row) || $row['UserID'] != $UserID){
  exit();
}

// CommentID와 같은 레코드를 삭제한다.
$deleteComment = "
  DELETE FROM '" . $PageID . "' WHERE CommentID ='$CommentID'
";

$ret = mysqli_query($connect_object, $deleteComment);

// 코멘트를 지운 뒤 페이지를 리로드 해 데이터를 다시 가져온다. 
echo ("<script>location.reload();</script>");

{% endhighlight %}


<br>
<hr>

<h2>로그인 기능을 넣기 위한 Modalbox 구현 - HTML</h2>

댓글 창 (iframe) 내에서 로그인 하는 기능을 구현하려면 로그인을 할 수 있는 Modal box를 띄워야 한다.

아래 html은 이전 프로젝트에서 사용하던 Modal box를 일부 속성을 변경해 구현한 것이다.

{% highlight html %}
<div id="LogInModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modal" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">EV Comment Service 로그인</h5>
        <!-- data-dismiss 속성을 통해, 취소 버튼을 누르면 모달 박스가 없어지는 것을 구현 -->
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <!-- times를 x 버튼 대신 이용함 -->
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="php-Action/RegisterURL.php" onsubmit="return AddURLButtonClicked()" method="post" accept-charset="utf-8">
          <div class="form-group">
            <label for="ID">ID</label>
            <input id="ID" name="ID" type="text" class="form-control">
          </div>
          <div class="form-group">
            <label for="PW">PW</label>
            <input id="PW" name="PW" type="text" class="form-control">
          </div>
          <div class="modal-footer">
            <!-- data-dismiss 속성을 통해, 취소 버튼을 누르면 모달 박스가 없어지는 것을 구현 -->
            <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
            <button type="submit" class="btn btn-primary">로그인</button>
          </div>
      </div>
    </div>
  </div>
</div>
{% endhighlight %}

<br>
<hr>

<h2>홈페이지 디자인 수정 및 기능 추가</h2>

댓글 관리 홈페이지 디자인의 색상, 아이콘 등을 다수 변경하였다.

해당 html 코드들이 다소 길어 여기에 올리지는 않는다.



오늘 작업하며 약간 아쉬웠던 부분은 서버가 집에 있어서 서버 쪽 스크립트 작업한 것을 테스트 해 볼 수 없다는 것이었다.
집에 가서 제대로 작동하는지 테스트 해 보고 작동하지 않는 부분들을 고칠 예정이다.
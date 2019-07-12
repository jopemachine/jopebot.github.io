---
layout: post
title: "모각코 5회차 결과"
subtitle: '2019-07-12, 5회차 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 모각코
---

<i>Posting Time : 19-07-12, 16:56</i><br>
<i>Updating Time : 19-07-12, 16:56</i><br>

---

<h2>Pagination</h2>

오늘 제일 먼저 한 것은 Pagination의 프로토 타입을 구현해 본 것이다.

아래처럼 php 파일 중간에 관련 로직을 삽입했다.

이전과 마찬가지로, 서버가 다른 컴퓨터에 있어 코드만 작성하고 테스트 해 볼 수는 없었지만,

버그가 있다면 천천히 잡으면 될 것 같다.

{% highlight php %}

      <div id="EV-Pagination">
        <a href="#">&laquo;</a>

        <?php
          // $PaginationDivision (페이지 나누는 기준)
          // $PaginationID (현재 페이지)
          // $PaginationEnd (끝 페이지)

          // 페이지네이션 할 수 있는 숫자를 몇 개까지 표시할 것인지 나타내는 int형 변수
          // (값을 바꿔도 되지만, 웹페이지 디자인 상 홀수여야 균형이 맞아보일 것 같으니 주의)
          $paginatorsNumber = 9;

          // 현재 페이지가 앞 쪽에 치우친 경우 (1부터 순차대로 $paginatorsNumber 수 만큼 출력)
          if($PaginationID - ($PaginationDivision / 2) <= 0){
            $startPoint = 1;
          }

          // 현재 페이지가 뒤 쪽에 치우친 경우 (순차대로 $paginatorsNumber 수 만큼 출력)
          else if($PaginationEnd - $PaginationID < $PaginationDivision / 2){

            // $startPoint = $PaginationID - ($paginatorsNumber - ($PaginationEnd - $PaginationID + 1));
            $startPoint = $PaginationEnd - $paginatorsNumber + 1;

          }
          // 페이지를 중앙에 놓으면 되는 경우
          else {
            $startPoint = $PaginationID - ($paginatorsNumber / 2);
          }

          for($i = $startPoint; $i <= $paginatorsNumber; $i++){

            // 반복문이 끝나기 전 Paginator가 끝나면 break
            if($i > $PaginationEnd){
              break;
            }

            // $paginationID와 같은 Paginator에 Active 클래스를 달아놓는다.
            if($i == $paginationID){
              $Active = 'paginator-active';
            }
            else {
              $Active = '';
            }

            echo sprintf('
              <a class="%s" href="https://evcommentservice.ga/Comment.php?db=%s&pageID=%s&mode=%s&paginationID=%s">%s</a>
            ', $Active, $URL_ID, $PageID, $EmotionalAnalysisMode, $paginationID, $i);
          }
        ?>

        <a href="#">&raquo;</a>
      </div>
{% endhighlight %}

<h2>댓글 출력 순서 변경</h2>

그 다음 한 것은 댓글의 출력순서 변경이다.

기존의 코드는 먼저 출력한 댓글이 먼저 나오는 구조를 갖고 있었는데,

그렇게 하는 것보다, 가장 최근에 달린 댓글이 가장 위에 나오는 쪽이 바람직할 것 같아,

코드를 변경했다. 작업 중 스택이 필요했는데, php에선 배열을 스택처럼 쓸 수 있어 편리했다.

{% highlight php %}

<?php

    $ret = mysqli_query($connect_object, $fetchAllComments);

    $commentsNumber = mysqli_num_rows($ret);

    // 몇 페이지가 끝인 지 계산
    if($commentsNumber % $PaginationDivision == 0){
      $PaginationEnd = $commentsNumber / $PaginationDivision;
    }
    else {
      $PaginationEnd = ($commentsNumber / $PaginationDivision) + 1;
    }

    // 댓글이 없는 경우 처리
    if($commentsNumber < 1){
      echo Comment::WarnNoCommentsToShow();
    }

    // $PaginationID에 따른 포인터 ($row) 이동
    for($i = 0; $i < $PaginationID * $PaginationDivision; $i++){
      if($i >= $commentsNumber){
        break;
      }
      $row = mysqli_fetch_array($ret);
    }

    $rowStack = array();
    // $PaginationDivision만큼 댓글을 push 하다 댓글이 더 없을 때 break.
    for($i = 0; $i < $PaginationDivision; $i++){

      if($i >= $commentsNumber){
        break;
      }

      $row = mysqli_fetch_array($ret);

      array_push($rowStack, $row);
    }

    while ($comment = array_pop($rowStack)){
      echo Comment::CreateComment(
        $comment['CommentUserId'],
        $comment['Content'],
        $comment['DateTime'],
        $comment['ProfileImageFileName'],
        $comment['CommentIndex']
      );
    }

  ?>
{% endhighlight %}

<h2>정규식 확인 - URL</h2>

그 다음 한 일은 서비스에 블로그 URL을 등록할 때, 입력한 값이 URL 형식이 맞는지 확인하는
코드의 작성이다. (정규식에 대해선 https://haru.kafra.kr/46 오른쪽 블로그의 코드를 사용했다.)

최상위 도메인의 종류가 매우 다양하고, 그것들을 전부 체크할 수 없을 것 같았기 때문에,
정규식으론 http, https 프로토콜 형식인지만 체크했다.

{% highlight js %}

function AddURLButtonClicked(){
  if(checkUrlForm($('#URL').val())){
    return true;
  }
  return false;
}

// url 형식인지를 체크( http, https 를 포함하는 형식 )
function checkUrlForm(strUrl) {
    var expUrl = /^http[s]?\:\/\//i;
    return expUrl.test(strUrl);
}

{% endhighlight %}

<h2>URL 중복 서비스 방지</h2>

그 다음 한 일은 evcommentService.ga 홈페이지에서 새 서비스를 추가할 때 DB에 중복된 레코드가 저장되지 않도록

변경하는 과정을 추가한 것이다. 해당 코드는 아래와 같으며, RegisterURL.php 파일에 추가하였다.

{% highlight php %}

// 중복 레코드가 있는지 검사. 존재한다면 이전 페이지로 돌아감
$searchURLID = "
  SELECT * FROM usersurltbl WHERE URLID = '$URL_ID'
";

$ret = mysqli_query($connect_object, $searchURLID);

$row = mysqli_fetch_array($ret);

if(empty($row)){
  echo ("<script language=javascript>alert('이미 존재하는 URL입니다. 서비스 관리자에게 문의하세요.')</script>");
  $prevPage = $_SERVER["HTTP_REFERER"];
  header("location:" . $prevPage);
  exit();
}

{% endhighlight %}

<h2>URL 서비스 제거 (PHP)</h2>

그 다음 한 일은 evcommentService.ga 홈페이지에서 등록해 놓았던 블로그 URL을 제거하는 php 로직 작성이다.

등록된 URL을 제거하면 컴포넌트를 include 해 놓아도 댓글 서비스를 이용할 수 없게 해야 한다.

{% highlight php %}
<?php

session_start();

$UserID = $_SESSION['user_id'];

// 세션에 ID가 없다면, 이용할 수 없으니, SignIn 페이지로 이동
if(!isset($UserID))
  echo ("<script language=javascript>alert('먼저 로그인하세요!')</script>");
  echo ("<script>location.href='../SignIn.php';</script>");
  exit();
}

require_once('MySQLConection.php');

// DB 연결
$connect_object = MySQLConnection::DB_Connect('userdb');

$URL_ID = $_POST["URLID"];

// DB에 UserID와 URLID가 같은 레코드가 존재하는지 검사
$deleteService = "
  DELETE FROM usersurltbl WHERE URLID ='$URL_ID' AND UserID ='$UserID'
";

$ret = mysqli_query($connect_object, $deleteService);

{% endhighlight %}

<h2>URL 서비스 제거 (JS)</h2>

위 PHP 코드의 실행은 특정 아이콘 (휴지통 아이콘) 을 클릭해 위 php 파일로 ajax를 전송함으로써 이뤄지는데,

이 js 코드는 아래와 같다. 아래 코드는 아이콘이 클릭되었을 때 해당 서비스를 제거하겠냐고 묻는

확인 Modal Box를 띄우면서 DeletingURLID를 해당 URL ID로 셋팅한다.

그리고 Modal Box의 확인 버튼을 누르면 DeleteService.php로 데이터를 넘겨 php 파일을 실행해

DB에서 해당 레코드를 삭제한다. success에는 페이지 리로드를 하기보단, 삭제한 Jumbotron 를 hide 함으로써,

페이지 리로드 없이 보다 용이하게 이용할 수 있도록 하려 했다.  

{% highlight js %}

var DeletingURLID;

function DeleteService(){

  $.ajax({
    type: "POST",
    url : "../purePHP/DeleteService.php",
    data : {
      URLID : DeletingURLID,
    },

    success : function(response) {
      console.log("서비스 제거 성공");
      $('#' + DeletingURLID).hide();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Ajax 수신에 실패했습니다!" + jqXHR.responseText);
    }
  })
}

function setIndexToDeleteRoom(urlID){
  DeletingURLID = urlID;
}

{% endhighlight %}

<h2>댓글 수정 로직 변경</h2>

기존의 코드는 댓글을 수정할 경우, DB 내 수정한 댓글의 Content만 업데이트 되도록 작성되어 있었다.

댓글을 변경하는 로직이 들어왔을 때, 블로그의 ev-mode가 full이나 binary 모드로 되어 있을 경우

(감정 분석 서비스를 이용하는 경우) 감정 분석 결과 값 역시 업데이트 해 줘야 하는데, 해당 로직을 변경하였다.

업데이트 된 쿼리문은 아래와 같다. (EditComment.php에서 아래 쿼리문을 실행한다.)

{% highlight php %}

// CommentID와 같은 레코드를 업데이트 한다.
$updateComment = "
  UPDATE `" . $PageID . "` SET Content = '$UpdatedContent', EmotionalAnalysisValue = '$EmotionalAnalysisValue' WHERE CommentIndex = '$CommentID'
";

{% endhighlight %}

<h2>회원가입 입력 값 확인 로직 수정</h2>

회원가입할 때 입력된 각 값들이 유효한 값인지 php 외에 자바스크립트에서도 작성해 놓았었다.

하지만 기존의 코드는 ID에 한글, 특수문자가 들어가 있어도 유효한 값이라고 판정하는 오류가 있었다.

정규식을 이용해 해당 입력 값 확인 로직을 다듬었으며, 이메일 주소와 핸드폰 번호에 대한 정규식 검사도 추가했다.

해당 정규식들은 아래 페이지들을 참고했다. 

https://ondemand.tistory.com/183

https://webisfree.com/2016-05-12/%EC%9D%B4%EB%A9%94%EC%9D%BC-%EC%A3%BC%EC%86%8C-%EA%B2%80%EC%A6%9D-%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D

수정한 코드는 아래와 같다. 아래 코드가 true를 리턴하는 경우에만 서버로 데이터가 전송된다.

핸드폰 주소에 대한 검사는 아래 페이지에서 코드를 가져와 사용했으며 아래 js 코드에 포함되어 있지 않다.

http://blog.tjsrms.me/jquery-%ED%95%B8%EB%93%9C%ED%8F%B0-%EB%B2%88%ED%98%B8-%EC%B2%B4%ED%81%AC%ED%95%98%EA%B8%B0/

{% highlight js %}

// 클라이언트 쪽에서 유효성 검사를 하고, 유효한 경우에만 넘어감
function SubmitButtonClicked(){

  // 4 ~ 20자의 영문 대소문자 + 숫자만 ID로 유효한 값이 될 수 있음
  let validReg_ID = /^[A-Za-z0-9+]{4,20}$/;
  var validReg_Email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  // 비밀번호와 비밀번호 확인이 같은 값인지 검사
  if($('#PW').val() != $('#PW_Confirm').val()){
    alert('비밀번호가 비밀번호 확인과 맞지 않습니다');
    return false;
  }

  // 정규식 ID 확인
  if (!validReg_ID.test($('#ID').val())) {
    alert('ID는 대소문자 알파벳과 숫자로만 구성되야 하며, 4자리 이상, 20자리 미만이어야 합니다.');
    return false;
  }

  // 이메일 주소의 유효성 검사
  if(!validReg_Email.test($('Email').val())){
    alert('올바른 이메일 주소 형식이 아닙니다.');
    return false;
  }

  return true;
}

{% endhighlight %}

<h2>회원가입 입력 값 확인 로직 수정 (PHP)</h2>

위 자바스크립트 코드에서 정규식을 이용해 잘못된 값으로 레코드를 생성하지 않도록 강제했지만,

js를 거치지 않고 php 파일을 직접 실행해 DB에 잘못된 값을 생성할 수 있다.

따라서, 정규식을 이용한 데이터 유효성 검사는 js에서만이 아니라, php (서버) 측에서도 실행되어야 한다.

기존의 SignUpAction.php는 DB에 중복된 ID가 존재하는지만 검사했지만, 서버 측에서도 ID, 이메일에 대해

정규식을 이용해 검사하도록 수정했다.

{% highlight php %}

$reg_ID = preg_match('/^[A-Za-z0-9+]{4,20}$/', $ID, null)
$reg_Email = preg_match('/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i', $Email, null);

// 매칭되지 않는 값이 들어올 경우 SignUp을 실행하지 않는다
if($reg_ID == 0 || $reg_Email == 0){
  echo ("<script language=javascript>alert('잘못된 입력값이 존재합니다.')</script>");
  echo ("<script>location.href='../SignUp.html';</script>");
  exit();
}

{% endhighlight %}

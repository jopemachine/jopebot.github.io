---
layout: post
title: "2019 모각코 12회차 결과"
subtitle: '2019-08-13, 12회차 2019 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 2019 모각코
---

오늘한 것은 주석 매크로 프로그램의 코드 작성 및 수정이었다.

기존에 작성했던 프로그램에선 desc, issue 값을 하나만 넣을 수 있었는데, 이 점이 맘에 들지 않아 코드를 수정했다.

아래는 셋팅 파일을 작성하는 로직 중 위와 관련된 코드이다.

(ts는 셋팅 파일을 참조하는 QTextStream이다.)

~~~cpp

    ts << "\n# Desc\n";

    for(int i = 0; i < ui->descTblWidget->rowCount(); i++){

        ts << ui->descTblWidget->item(i, 0)->text() + "::desc       +=       "
              + ui->descTblWidget->item(i, 1)->text() << "\n";
    }

    ts << "\n# Issue\n";

    for(int i = 0; i < ui->issueTblWidget->rowCount(); i++){

        ts << ui->issueTblWidget->item(i, 0)->text() + "::issue       +=       "
              + ui->issueTblWidget->item(i, 1)->text() << "\n";
    }

    ts << "\n# Reference URLs\n";

    for(int i = 0; i < ui->referenceTbl->rowCount(); i++){

        ts << ui->referenceTbl->item(i, 0)->text() + "::refURLs       +=       "
              + ui->referenceTbl->item(i, 1)->text() << "\n";
    }

~~~

그 외 Recursive Traversal 이란 셋팅 Flag를 추가해 체크되어 있을 때만 (true일 때)

디렉토리를 재귀적으로 순회하고 false일 땐 지정 디렉토리만 순회하도록 했다.

해당 프로그램의 GUI는 아래와 같다.

![](/img/posts/2019-08-13-Mogacko12_Result/ScreenClip.png)

위와 같은 셋팅으로 실행하면 cpp, h 파일의 위에 아래와 같은 주석이 추가할 수 있다.

(Desc, Issue, Ref URLs는 다른 탭에서 셋팅함)

{% highlight cpp %}

// ==============================+===============================================================
// @ Author : jopemachine
// @ Last Edited : 2019-08-13, 16:14:18
// @ Desc : 
// @     1. 메인 윈도우의 구현 파일이다.
// @ Issue : 
// @ Email : jopemachine@naver.com
// @ Contact : 012-345-6789
// @ Github Account : gravityc95@gmail.com
// @ Ref URLs : 
// @     1. https://github.com/jopemachine/CommentHelper
// @     2. https://github.com/jopemachine/Gomoku-Qt
// @ Memo : 
//  1. 메모 1
//  2. 메모 2
//  3. 메모 3
// ==============================+===============================================================

{% endhighlight %}


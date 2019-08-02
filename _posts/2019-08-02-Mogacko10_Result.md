---
layout: post
title: "모각코 10회차 결과"
subtitle: '2019-08-02, 10회차 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 모각코
---

<i>Posting Time : 19-08-02, 16:51</i><br>
<i>Updating Time : 19-08-02, 16:51</i><br>

---

<h2>추가한 계산기 로직</h2>

1 - TextIndicator 수정

계산한 후의 리턴값을 double형으로 바꾸니 3+3 = 6.00000 으로 표시되는 등, 굳이 소수점을 붙일 필요가 없는

경우에도 소수점이 붙어 표시되는게 거슬려 이것부터 고쳤다.

아래의 간단한 로직을 사용했다.

{% highlight cpp %}

	// 소수 부분이 0이라면, 따로 표기하지 않는다.
	int integerValue = atoi(outputStr.c_str());
	double fractionValue = atof(outputStr.c_str()) - integerValue;

 	if (!fractionValue) {
		outputStr = to_string(integerValue);
	}

{% endhighlight %}

2 - 버튼에 이벤트 추가

About Dialog에 버튼을 만들어 버튼이 클릭되었을 때 윈도우에 디폴트 브라우저로 설정되어 있는

브라우저가 실행되어 특정 URL로 이동하게 만들었다. 

ShellApi.h의 ShellExecute를 이용하니 간단하게 구현할 수 있었다.

해당 코드는 https://stackoverflow.com/questions/3037088/how-to-open-the-default-web-browser-in-windows-in-c를 참고했다

{% highlight cpp %}

if (LOWORD(wParam) == IDOK2) 
		{
			ShellExecute(NULL, L"open", L"https://example.com", NULL, NULL, SW_SHOWNORMAL);
			return (INT_PTR)TRUE;
		}
  
{% endhighlight %}


<h2>옵저버 패턴 복습</h2>

간단하게 강의에서 배웠던 코드들을 따라쳐봤다.

Button 클래스의 코드는 아래와 같다.

{% highlight java %}

public class Button {

  public void OnClick(){
    if(onClickListener != null)
    onClickListener.onClick(this);
  }

  public interface OnClickListener{
    public void onClick(Button button);
  }

  private OnClickListener onClickListener;

  public void setOnClickListener(OnClickListener listener){
    this.onClickListener = listener;
  }  
}

{% endhighlight %}

위와 같이 작성한 Button이 클릭되었을 때의 처리는 아래와 같이 구현할 수 있다.

{% highlight java %}

public class Application{
  
  public static void main(String[] args){

    Button button = new Button();

    button.setOnClickListener(new OnClickListener(){
      
        @Override
        public void onClick(Button button){
          // 버튼이 클릭되었을 때의 이벤트 처리
          System.out.println(button + "is clicked");
        }

    });
  }

}

{% endhighlight %}

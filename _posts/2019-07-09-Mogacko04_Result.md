---
layout: post
title: "윌 스미스가 하드캐리하여 의도치 않게 원작을 뛰어넘은 실사영화"
subtitle: '2019-07-09, 4회차 모각코 결과'
author: "jopemachine"
header-img: "img/post-bg-infinity.jpg"
header-mask: 0.3
tags:
  - 모각코
---

<i>Posting Time : 19-07-09, 16:52</i><br>
<i>Updating Time : 19-07-09, 16:52</i><br>

---

오늘 한 것은 토이 프로젝트 RPG 게임 (유니티 엔진으로 제작) 에서 플래그 클래스를 만든 것이다.

특히, 특정 던전의 클리어 여부를 나타내는 플래그 클래스를 만들어 클리어 되어 있는 던전의 경우

씬을 로드할 때 특정 오브젝트를 활성화 시키는 이벤트를 구현하려 했다.

오늘 모각코 시간에 작성한 플래그 클래스는 아래와 같다.

데이터 로드에 LitJson을 사용했다.

{% highlight csharp %}

using UnityEngine;
using LitJson;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace UnityChanRPG
{
    // 플레이어의 던전 클리어 상태, 퀘스트 진행 상태 등의 플래그를 관리하는 싱글톤 클래스들
    // 각 컴포넌트들에 FlagManager를 달아서 enum을 달아 사용한다.
    class FlagManager : MonoBehaviour
    {
        // Key 값을 던전 이름으로, Value 값을 클리어 여부 String으로 한다
        public static FlagManager dungeonCleared;

        public static FlagManager challengeHomework;

        public static FlagManager questCleared;

        [SerializeField]
        public FlagType type;

        [SerializeField]
        public static Hashtable flagList;

        public enum FlagType {
            // 던전 클리어 여부
            DungeonCleared,
            // 도전과제 클리어 여부
            ChallengeHomework,
            // 퀘스트 클리어 여부
            QuestCleared
        }

        #region Data Parsing and Load

        IEnumerator dataload_DungeonCleared()
        {
            string flagJsonString = File.ReadAllText(Application.dataPath + "/Custom/Resources/DungeonClearedFlagData.json");

            JsonData flagData = JsonMapper.ToObject(flagJsonString);

            Debug.Assert(flagData != null, "flag Data == null");

            ParsingFlagData(flagData);

            yield return null;
        }

        IEnumerator dataload_ChallengeHomework()
        {
            yield return null;
        }

        IEnumerator dataload_QuestCleared()
        {
            yield return null;
        }

        private void ParsingFlagData(JsonData flagData)
        {
            for (int i = 0; i < flagData.Count; i++)
            {
                flagList.Add(flagData[i]["FlagName"].ToString(), flagData[i]["FlagData"].ToString());
            }
        }

        #endregion

        // 각 싱글톤 객체 초기화
        private void Awake()
        {
            flagList = new Hashtable();

            switch (type)
            {
                case FlagType.DungeonCleared:
                    dungeonCleared = this;
                    StartCoroutine("dataload_DungeonCleared");
                    break;
                case FlagType.ChallengeHomework:
                    challengeHomework = this;
                    StartCoroutine("dataload_ChallengeHomework");
                    break;
                case FlagType.QuestCleared:
                    questCleared = this;
                    StartCoroutine("dataload_QuestCleared");
                    break;
            }
        }

        private static bool getFlag(string key) {
            return string.Equals(flagList[key], "TRUE") ? true : false; 
        }
    }
}

{% endhighlight %}

아래는 수정한 Dungeon 클래스이다.

기존 Dungeon 클래스에서 isCleared를 두어, 플래그 클래스에서 로드한다.

{% highlight csharp %}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace UnityChanRPG
{
    public class Dungeon : Scene
    {
        public static Scene thisScene;

        // 던젼 씬에서 시작할 때 시작할 기본 위치
        public GameObject defaultPosition;

        public Camera cam;

        [SerializeField]
        public List<EntryPoint> adjacentMap;

        // 클리어된 던전 씬에선 Direct Light를 활성화 해, 편하게 이동할 수 있게한다.
        public bool IsCleared;

        public override void MoveCharacter()
        {
            // 디버깅, 단위 테스트 등의 이유로 던전에서 시작하면 previousScene이 null이므로 Goto를 defaultPosition에 적용해야 한다
            if (previousScene == null) 
            {
                Goto(defaultPosition.transform.position);
                return;
            }

            // previousScene에 해당하는 Entrance 포인트를 찾아, Goto로 캐릭터를 이동시킴
            for (int i = 0; i < adjacentMap.Count; i++)
            {
                // 엔트리 포인트의 이름을 전환할 씬의 이름과 같게할 것
                if (adjacentMap[i].nodeName == Scene.previousScene)
                {
                    Goto(adjacentMap[i].entrance.transform.position);
                    return;
                }
            }
        }

        private void Start()
        {
            thisScene = this;
            // Scene의 Init 를 호출해, 먼저 부모의 변수부터 초기화 시키고 진행
            base.PlayerInit();
            base.ScreenCoverInit();
            base.CinemachineCamOn();

            // 비를 활성화 한다
            GameObject.FindGameObjectWithTag("DungeonMap").transform.Find("Rain").gameObject.SetActive(true);

            // 클리어 된 던전이라면 Directional Light를 활성화 해 준다. (디폴트 값은 비활성화)
            if (IsCleared) {
                transform.Find("Dungeon Directional Light").gameObject.SetActive(true);
            }

            FadeIn();
            MusicManager.mInstance.Play(backGroundMusic[0]);
            playerControl.NoInputMode = false;

            cam = GameObject.FindGameObjectWithTag("MainCamera").gameObject.GetComponent<Camera>();

            ControlChange(CHARACTER_DEFAULT_SCALE, cam.transform);

            MoveCharacter();
            
            MapNameIndicator.Instance.IndicateMapName(placeName);
        }
    }
}

{% endhighlight %}

직접 클래스를 만들고 테스트 해 보니, 씬을 로드할 때 데이터 로드 코루틴 하는 부분이 실행되기 전 씬이 로드되어,

해당 FlagList 값이 null이 나오는 버그가 있다. 집에 가서 마저 고치도록 해야 겠다.
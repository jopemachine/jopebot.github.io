---
layout: post
title: Mircroservice의 특징
subtitle: 백엔드
author: jopemachine
tags:
  - Backend
header-img: img/header-img/backend.jpg
header-mask: 0.3
last-update: September 23, 2022
---

# Mircroservice

- 전통적인 애플리케이션 서버는 모놀리틱 (Monolithic, Single Unit) 으로 동작.

- **매크로 서비스** < **미니 서비스** < **마이크로서비스**. 순으로 서비스를 더욱 잘게 분리함.

- 매크로 서비스는 엔티티 중심의 Restful API.

- 미니 서비스는 Docker 같은 가상화 기술로 서비스를 분할해 놓은 것.

- 마이크로서비스는 한 컨테이너에 한 서비스를 담아 놓고, CI/CD 파이프라인을 각 컨테이너에 독립적으로 갖춘 것. Auto-scaling 등의 사용으로 독립적인 확장성 확보 가능.

- 즉, 모든 서비스들을 컨테이너에 담아 놓고 각 서비스들의 `RPC` (Remote procedure call) 를 통한 상호 작용으로 서비스를 구현하는 아키텍쳐를 **마이크로서비스**라고 부름.

## 마이크로서비스의 특징

- 하나의 function call로 진행하던 과정이 프로토콜로 바뀜 (http, RPC 등..), 따라서 결합도도 작아짐. (loosely-coupled)

- 공통의 프로토콜을 사용하면 되기 때문에 언어의 제약에서 자유로운 편.

- 각 개발자들이 독립적으로 서비스를 만들 수 있으므로 배포, 확장, 테스트, tech stack이 독립적이고 개발 사이클이 빠름.

- 다수의 자원을 사용하기 때문에 돈이 많이 들고, 유지보수할 때 더 많은 노력이 필요함.

- 프로토콜을 사용하여 통신함으로써 오버헤드가 생김.

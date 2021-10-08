---
layout: post
title: As a service 종류
subtitle: Cloud
author: jopemachine
tags:
  - Cloud
header-img: img/header-img/cloud.png
header-mask: 0.3
last-update: October 11, 2021
---

# As a service 종류

## IaaS (Infrastructure as a service)

- 하드웨어 없이 인프라 요소 (서버)를 사용할 수 있도록 해 주는 서비스 (* AWS EC2, AWS S3). as a service 시리즈 (?) 중에선 가장 많은 부분을 개발자가 관리해주어야 한다.

## CaaS (Container as a service)

- 컨테이너를 사용해서 애플리케이션을 배포할 환경을 제공. (* AWS ECS) OS가 container 형태로 제공되므로 IaaS 보다 더 많은 서비스를 해 준다.

## PaaS (Platform as a service)

- 인프라와 런타임 환경 제공 (* Heroku). 플랫폼 까지 제공해주므로 CaaS 보다 더 많은 서비스를 해 준다.

## SaaS (Software as a service)

- 소프트웨어를 제공. (그냥 서비스 전체를 제공해주는 것)

## FaaS, Serverless (Function as a service)

- 애플리케이션 실행 환경 (함수) 제공. 실행된 횟수만큼 과금. (* AWS Lambda). 실행 환경 자체를 제공해주고 함수만 넘겨 주면 되므로 PaaS 보다 더 많은 서비스를 해 준다.

# 기타

- 개발자가 관리해야 하는 영역은, `IaaS > CaaS > PaaS > FaaS > SaaS` 순으로 많다.

- 그 외 Shield.io 같은 곳에선 `BaaS` (Badge as a service) 같은 축약어를 사용하는 등 유행어 처럼 쓰이는 듯 함..







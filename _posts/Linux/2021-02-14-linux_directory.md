---
layout: post
title: "리눅스 디렉토리 구조"
subtitle: '리눅스'
author: "jopemachine"
header-img: "img/header-img/linux.png"
header-mask: 0.3
tags:
  - Linux
---

## 환경 정보 설정 관련

### /etc/profile

모든 사용자의 환경 정보를 설정 (환경 변수)

로그인 할 때 적용된다.

### /etc/bashrc

모든 사용자들의 bash shell이 열릴 때 프롬프트, alias 등 설정

### ~/.bash_profile

각 사용자의 환경 변수 설정

### ~/.bashrc

각 사용자의 bash shell 설정 정보가 담김.

## Root 리렉토리 내 주요 디렉토리들

### /bin

ls, sort, date 등의 리눅스 명령어 포함.

### /boot

부팅 가능한 리눅스 커널과 GRUB 등 포함

### /dev

하드 디스크, RAM, ROM, TTY 등의 장치 엑세스 포인트들 포함

### /etc

관리용 설정 파일들 포함.

profile, bashrc, httpd.conf 등

### /home

일반 사용자 계정 디렉토리 할당

### /media

자동으로 마은트 되는 장치들의 배정 위치

### /lib

`/bin`이나 `sbin`에 있는 앱들이 시스템을 시작하기 위해 필요한 공유 라이브러리들이 담김

### /proc

시스템 리소스 정보가 담김

### /sbin

일부 명령과 데몬 프로세스들이 담김

### /usr

시스템 시작 시 필요한 요소가 아닌 문서, 라이브러리 등등을 포함하며,

리눅스 설치 이후에 변경되지 않는 파일들을 저장함.

### /var

각종 앱에 사용되는 데이터들이 담김.

특히 웹 서버, FTP 서버가 공유하는 파일들이 여기에 저장됨.

시스템 로그 파일 (/var/log), 스풀 파일 (/var/spool) 등도 이 디렉토리를 사용.

서버 컴퓨터에선 /var 디렉토리를 별개의 파일 시스템으로 만드는 것이 일반적이다.

### /tmp

애플리케이션들이 임시로 사용하는 파일들이 저장됨

### /opt

애드온 애플리케이션 소프트웨어를 저장하는 디렉토리 구조.

## etc 내 주요 설정 파일들

### cron*

cron 유틸리티의 실행 일정

### httpd

아파치 웹 서버의 동작 구성

### init.d

시스템 V 방식의 런레벨 스크립트. 

이 스크립트에 정의된대로 각 서비스는 특정 런레벨에서 시작, 중지 된다.

### security

컴퓨터에 적용된 각종 기본 보안 설정 

### skel

새로운 사용자가 추가될 때 홈 디렉토리에 이 파일들을 복사한다.

### systemd

부트 프로세스와 시스템 서비스 관리를 위해 systemd 관련 파일이 담겨 있음.

## 출처

[리눅스 바이블](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791185890586)



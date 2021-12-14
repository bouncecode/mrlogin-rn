# MrLogin RN 예제

## 사용된 라이브러리

`react-native-inappbrowser-reborn`: 로그인 뷰를 실행하기 위한 라이브러리입니다.
`react-native-url-polyfill`: React Native 에서 URL 파싱을 위한 polyfill 입니다.
`jwt-decode`: JWT 를 디코딩 하기 위한 라이브러리입니다.

## 수정된 파일

`App.js`: 로그인 뷰를 실행하고, 로그인 결과를 반환받는 코드가 있습니다.
`android/build.gradle`: `supportLibVersion = "28.0.0"` 가 설정되었습니다.
`android/app/src/main/AndroidManifest.xml`: 안드로이드를 위한 딥링크가 추가되었습니다.
`ios/mrlogin_rn/Info.plist`: iOS를 위한 딥링크가 추가되었습니다.

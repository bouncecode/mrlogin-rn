import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {URL} from 'react-native-url-polyfill';
import jwtDecode from 'jwt-decode';

const App = () => {
  const [loggedData, setLoggedData] = useState();

  const onPressLogin = async () => {
    // 프로젝트 아이디로 수정하세요.
    const projectId = 'ccc15289-9634-4cbe-bd2a-449d539a8cdc';

    // AndroidManifest.xml(안드로이드)와 Info.plist(iOS)에 로그인 완료 후 반환받을 딥링크 주소를 추가하세요.
    // 참고 URL: https://github.com/proyecto26/react-native-inappbrowser#authentication-flow-using-deep-linking

    const redirectUri =
      Platform.OS == 'android'
        ? `mrloginrnexample://mrlogin/auth`
        : `mrloginrnexample://auth`;

    const queryString = new URLSearchParams({
      client_id: projectId,
      redirect_uri: redirectUri,
    }).toString();

    const loginUrl = `https://mrlogin.io/login?${queryString}`;

    // provider 를 지정하면 원하는 소셜로그인 화면을 다이렉트로 표시할 수 있습니다.
    // const loginUrl = `https://mrlogin.io/auth/${provider}/login?${queryString}`;

    try {
      const authData = await InAppBrowser.openAuth(loginUrl, redirectUri, {
        // iOS Properties
        ephemeralWebSession: false,
        // Android Properties
        showTitle: false,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
      });

      if (!authData.url) {
        alert(JSON.stringify(authData));
        return;
      }

      let parsedUrl = new URL(authData.url);
      const accessToken = parsedUrl.searchParams.get('access_token');
      const refreshToken = parsedUrl.searchParams.get('refresh_token');

      setLoggedData({
        accessToken: jwtDecode(accessToken),
        refreshToken: refreshToken,
      });
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity onPress={onPressLogin}>
            <View style={styles.button}>
              <Text style={styles.text}>로그인 버튼</Text>
            </View>
          </TouchableOpacity>
        </View>
        {loggedData ? (
          <View style={styles.data}>
            <Text>{JSON.stringify(loggedData, null, 4)}</Text>
          </View>
        ) : undefined}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  button: {
    padding: 12,
    backgroundColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  data: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 24,
  },
});

export default App;

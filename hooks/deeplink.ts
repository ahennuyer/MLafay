import * as Linking from 'expo-linking'

import { useEffect, useState } from 'react';

import _ from 'lodash'

const useDeeplink = (listener: any) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const deeplinkSubscription = Linking.addEventListener('url', ({url}: {url: any}) => {
      if (url && _.includes(url, 'type=recovery')) url = _.replace(url, '#', '?')
      if (url && _.includes(url, Linking.createURL('#'))) url = _.replace(url, '#', '?')
      setUrl(url);
      listener(url)
    })

    return () => deeplinkSubscription.remove();
  }, [listener]);

  useEffect(() => {
    const getInitialUrl = async () => {
      let url = await Linking.getInitialURL()
      if (url && _.includes(url, 'type=recovery')) url = _.replace(url, '#', '?')
      if (url && _.includes(url, Linking.createURL('#'))) url = _.replace(url, '#', '?')
      setUrl(url);
    }

    getInitialUrl();
  }, []);

  return url;
}

export default useDeeplink;

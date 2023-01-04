import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

import { Alert, Button, Image, StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'

import { supabase } from '../libs/supabase'

// import DocumentPicker, { isCancel, isInProgress, types } from 'react-native-document-picker'




interface Props {
  size: number
  url: string 
  onUpload: (filePath: string) => void
}

export default function Avatar({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const avatarSize = { height: size, width: size }
  const [ status, requestPermission ] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  if (status === null) {
		requestPermission();
	}
  async function downloadImage(path: string) {
    console.log(path)
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)

      console.log(data)
      if (error) {
        throw error
      }

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload = () => {
        setAvatarUrl(fr.result as string)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error downloading image: ', error.message)
      }
    }
  }

  // async function uploadAvatar() {
  //   try {
  //     setUploading(true)

  //     // const file = await DocumentPicker.pickSingle({
  //     //   presentationStyle: 'fullScreen',
  //     //   copyTo: 'cachesDirectory',
  //     //   type: types.images,
  //     //   mode: 'open',
  //     // })

  //     const File = async () => {
  //       let result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         allowsEditing: true,
  //         quality: 1,
  //         aspect: [4,3]
  //       })
  //     }  
  //     console.log(File)

  //     // const photo = {
  //     //   uri: file.fileCopyUri,
  //     //   type: file.type,
  //     //   name: file.name,
  //     // }

  //     // const formData = new FormData()
  //     // formData.append('file', JSON.parse(JSON.stringify(photo)))

  //     // const fileExt = file.name?.split('.').pop()
  //     // const filePath = `${Math.random()}.${fileExt}`

  //     // let { error } = await supabase.storage.from('avatars').upload(filePath, formData)

  //     // if (error) {
  //     //   throw error
  //     // }

  //     // onUpload(filePath)
  //   } catch (error) {
  //     if (isCancel(error)) {
  //       console.warn('cancelled')
  //       // User cancelled the picker, exit any dialogs or menus and move on
  //     } else if (isInProgress(error)) {
  //       console.warn('multiple pickers were opened, only the last will be considered')
  //     } else if (error instanceof Error) {
  //       Alert.alert(error.message)
  //     } else {
  //       throw error
  //     }
  //   } finally {
  //     setUploading(false)
  //   }
  // }

  const uploadAvatar = async () => {
    setUploading(true)
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			quality: 1
		});

    console.log(result)
		if (!result.canceled) {
      
      const ext = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf(".") + 1);
      const filename = result.assets[0].uri.replace(/^.*[\\\/]/, "");

      let formData = new FormData()
      formData.append("files", JSON.parse(JSON.stringify({
        uri: result.assets[0].uri,
        name: filename,
        type: result.assets[0].type ? `image/${ext}` : ''
      })));
        
         
      let { error } = await supabase.storage.from('avatars').upload(filename, formData)

      if (error) {
        throw error
      }
      onUpload(result.assets[0].uri);
			setAvatarUrl(result.assets[0].uri);
		} else {
			alert('You did not select any image.');
		}
	};

  return (
    <View>
      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          accessibilityLabel="Avatar"
          style={[avatarSize, styles.avatar, styles.image]}
        />
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View>
        <Button
          title={uploading ? 'Uploading ...' : 'Upload'}
          onPress={uploadAvatar}
          disabled={uploading}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 5,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: '#333',
    border: '1px solid rgb(200, 200, 200)',
    borderRadius: 5,
  },
})
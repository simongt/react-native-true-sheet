import { useRef } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { TrueSheetProvider, type TrueSheet } from '@lodev09/react-native-true-sheet';

import { BLUE, GAP, SPACING } from '../utils';
import { Button, Input, Spacer } from '../components';
import { BasicSheet, BlankSheet, PromptSheet, FlatListSheet } from '../components/sheets';

interface TestScreenProps {
  onGoBack: () => void;
}

export const TestScreen = ({ onGoBack }: TestScreenProps) => {
  const basicSheet = useRef<TrueSheet>(null);
  const promptSheet = useRef<TrueSheet>(null);
  const flatListSheet = useRef<TrueSheet>(null);
  const keyboardSheet = useRef<TrueSheet>(null);

  const presentKeyboardSheet = async () => {
    const startedAt = Date.now();
    console.log('Keyboard sheet: present() called');
    await keyboardSheet.current?.present();
    console.log(`Keyboard sheet: present() resolved after ${Date.now() - startedAt} ms`);
  };

  return (
    <TrueSheetProvider>
      <View style={styles.content}>
        <Button text="Go Back" onPress={onGoBack} />
        <Input />
        <Button text="Keyboard Sheet" onPress={presentKeyboardSheet} />
        <Spacer />
        <Button text="Basic Sheet" onPress={() => basicSheet.current?.present()} />
        <Button text="Prompt Sheet" onPress={() => promptSheet.current?.present()} />
        <Button text="FlatList Sheet" onPress={() => flatListSheet.current?.present()} />

        <BasicSheet dismissible={false} initialDetentIndex={0} dimmed={false} ref={basicSheet} />
        <PromptSheet ref={promptSheet} />
        <FlatListSheet ref={flatListSheet} />
        <BlankSheet ref={keyboardSheet} onWillDismiss={() => Keyboard.dismiss()} />
      </View>
    </TrueSheetProvider>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: BLUE,
    padding: SPACING,
    gap: GAP,
  },
});

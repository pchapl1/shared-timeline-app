import { Text, TextProps, TextStyle } from 'react-native';

import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';

type Variant =
  | 'hero'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodyStrong'
  | 'bodySmall'
  | 'caption';

type Props = TextProps & {
  variant?: Variant;
  color?: string;
};

export function AppText({
  variant = 'body',
  color = colors.text,
  style,
  children,
  ...props
}: Props) {
  return (
    <Text
      {...props}
      style={[
        typography[variant] as TextStyle,
        { color },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
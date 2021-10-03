import React from 'react';
import { StyleSheet } from 'react-native';

export const EggShell = '#F0EBD8';
export const RichBlack = '#0D1321';
export const PrussianBlue = '#1D2D44';
export const BlackCoral = '#3E5C76';
export const ShadowBlue = '#748CAB';

export default StyleSheet.create({
    // text colors
    text_egg: {
        color: EggShell,
    },
    text_rich_black: {
        color: RichBlack,
    },
    text_prussian_blue: {
        color: PrussianBlue,
    },
    text_black_coral: {
        color: BlackCoral,
    },
    text_shadow_blue: {
        color: ShadowBlue,
    },
    // background
    bg_egg: {
        backgroundColor: EggShell,
    },
    bg_rich_black: {
        backgroundColor: RichBlack,
    },
    bg_prussian_blue: {
        backgroundColor: PrussianBlue,
    },
    bg_black_coral: {
        backgroundColor: BlackCoral,
    },
    bg_shadow_blue: {
        backgroundColor: ShadowBlue,
    },
    // shadows
    shadow1: color => ({
        shadowColor: color,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        
        elevation: 5,
    }),
});

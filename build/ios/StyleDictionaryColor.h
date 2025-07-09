
//
// StyleDictionaryColor.h
//

// Do not edit directly, this file was auto-generated.


#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
ColorsBlack,
ColorsWhite,
ColorsOrange100,
ColorsOrange200,
ColorsOrange300,
ColorsOrange400,
ColorsOrange500,
ColorsOrange600,
ColorsOrange700,
ColorsOrange800,
ColorsOrange900,
ColorsNeutrals50,
ColorsNeutrals100,
ColorsNeutrals200,
ColorsNeutrals300,
ColorsNeutrals400,
ColorsNeutrals500,
ColorsNeutrals600,
ColorsNeutrals700,
ColorsNeutrals800,
ColorsNeutrals900,
ColorsBrandPurple50,
ColorsBrandPurple100,
ColorsBrandPurple300,
ColorsBrandPurple500,
ColorsBrandPurple600,
ColorsBrandPurple700,
ColorsGreen50,
ColorsGreen100,
ColorsGreen300,
ColorsGreen500,
ColorsGreen600,
ColorsGreen700,
ColorsRed50,
ColorsRed100,
ColorsRed300,
ColorsRed500,
ColorsRed600,
ColorsRed700,
ColorsBlue50,
ColorsBlue100,
ColorsBlue300,
ColorsBlue500,
ColorsBlue600,
ColorsBlue700,
ColorsYellow50,
ColorsYellow100,
ColorsYellow300,
ColorsYellow500,
ColorsYellow600,
ColorsYellow700
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end

//
// StyleDictionaryColor.m
//

// Do not edit directly, this file was auto-generated.


#import "StyleDictionaryColor.h"

@implementation StyleDictionaryColor

+ (UIColor *)color:(StyleDictionaryColorName)colorEnum{
  return [[self values] objectAtIndex:colorEnum];
}

+ (NSArray *)values {
  static NSArray* colorArray;
  static dispatch_once_t onceToken;

  dispatch_once(&onceToken, ^{
    colorArray = @[
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.961f green:0.961f blue:0.961f alpha:1.000f],
[UIColor colorWithRed:0.929f green:0.929f blue:0.929f alpha:1.000f],
[UIColor colorWithRed:0.820f green:0.820f blue:0.820f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.659f blue:0.659f alpha:1.000f],
[UIColor colorWithRed:0.463f green:0.463f blue:0.463f alpha:1.000f],
[UIColor colorWithRed:0.349f green:0.349f blue:0.349f alpha:1.000f],
[UIColor colorWithRed:0.220f green:0.220f blue:0.220f alpha:1.000f],
[UIColor colorWithRed:0.102f green:0.102f blue:0.102f alpha:1.000f],
[UIColor colorWithRed:0.918f green:0.941f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f],
[UIColor colorWithRed:0.118f green:0.278f blue:0.647f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.918f blue:0.922f alpha:1.000f],
[UIColor colorWithRed:0.851f green:0.176f blue:0.125f alpha:1.000f],
[UIColor colorWithRed:0.706f green:0.137f blue:0.094f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.980f blue:0.922f alpha:1.000f],
[UIColor colorWithRed:0.969f green:0.565f blue:0.035f alpha:1.000f],
[UIColor colorWithRed:0.710f green:0.278f blue:0.031f alpha:1.000f],
[UIColor colorWithRed:0.925f green:0.992f blue:0.953f alpha:1.000f],
[UIColor colorWithRed:0.012f green:0.596f blue:0.333f alpha:1.000f],
[UIColor colorWithRed:0.008f green:0.478f blue:0.282f alpha:1.000f],
[UIColor colorWithRed:0.941f green:0.976f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.008f green:0.416f blue:0.635f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.961f green:0.961f blue:0.961f alpha:1.000f],
[UIColor colorWithRed:0.929f green:0.929f blue:0.929f alpha:1.000f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f],
[UIColor colorWithRed:0.918f green:0.941f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.851f green:0.176f blue:0.125f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.918f blue:0.922f alpha:1.000f],
[UIColor colorWithRed:0.969f green:0.565f blue:0.035f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.980f blue:0.922f alpha:1.000f],
[UIColor colorWithRed:0.012f green:0.596f blue:0.333f alpha:1.000f],
[UIColor colorWithRed:0.925f green:0.992f blue:0.953f alpha:1.000f],
[UIColor colorWithRed:0.008f green:0.416f blue:0.635f alpha:1.000f],
[UIColor colorWithRed:0.941f green:0.976f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.102f green:0.102f blue:0.102f alpha:1.000f],
[UIColor colorWithRed:0.349f green:0.349f blue:0.349f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.659f blue:0.659f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.659f blue:0.659f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f],
[UIColor colorWithRed:0.851f green:0.176f blue:0.125f alpha:1.000f],
[UIColor colorWithRed:0.012f green:0.596f blue:0.333f alpha:1.000f],
[UIColor colorWithRed:0.969f green:0.565f blue:0.035f alpha:1.000f],
[UIColor colorWithRed:0.008f green:0.416f blue:0.635f alpha:1.000f],
[UIColor colorWithRed:0.820f green:0.820f blue:0.820f alpha:1.000f],
[UIColor colorWithRed:0.929f green:0.929f blue:0.929f alpha:1.000f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f],
[UIColor colorWithRed:0.851f green:0.176f blue:0.125f alpha:1.000f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f],
[UIColor colorWithRed:0.118f green:0.278f blue:0.647f alpha:1.000f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f],
[UIColor colorWithRed:0.118f green:0.278f blue:0.647f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.659f blue:0.659f alpha:1.000f],
[UIColor colorWithRed:0.118f green:0.278f blue:0.647f alpha:1.000f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f],
[UIColor colorWithRed:0.349f green:0.349f blue:0.349f alpha:1.000f],
[UIColor colorWithRed:0.102f green:0.102f blue:0.102f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.659f blue:0.659f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.659f blue:0.659f alpha:1.000f],
[UIColor colorWithRed:0.008f green:0.416f blue:0.635f alpha:1.000f],
[UIColor colorWithRed:0.851f green:0.176f blue:0.125f alpha:1.000f],
[UIColor colorWithRed:0.969f green:0.565f blue:0.035f alpha:1.000f],
[UIColor colorWithRed:1.000f green:0.800f blue:0.000f alpha:1.000f],
[UIColor colorWithRed:0.012f green:0.596f blue:0.333f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.780f blue:0.745f alpha:1.000f],
[UIColor colorWithRed:0.220f green:0.663f blue:0.663f alpha:1.000f],
[UIColor colorWithRed:0.196f green:0.678f blue:0.902f alpha:1.000f],
[UIColor colorWithRed:0.498f green:0.396f blue:0.271f alpha:1.000f],
[UIColor colorWithRed:0.345f green:0.337f blue:0.839f alpha:1.000f],
[UIColor colorWithRed:0.612f green:0.239f blue:0.839f alpha:1.000f],
[UIColor colorWithRed:0.961f green:0.239f blue:0.663f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.961f green:0.961f blue:0.961f alpha:1.000f],
[UIColor colorWithRed:0.820f green:0.820f blue:0.820f alpha:1.000f],
[UIColor colorWithRed:0.929f green:0.929f blue:0.929f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.961f green:0.961f blue:0.961f alpha:1.000f],
[UIColor colorWithRed:0.820f green:0.820f blue:0.820f alpha:1.000f],
[UIColor colorWithRed:0.329f green:0.329f blue:0.337f alpha:0.341f],
[UIColor colorWithRed:0.961f green:0.961f blue:0.961f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.961f green:0.961f blue:0.961f alpha:1.000f],
[UIColor colorWithRed:0.102f green:0.102f blue:0.102f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.349f green:0.349f blue:0.349f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.659f blue:0.659f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.659f blue:0.659f alpha:1.000f],
[UIColor colorWithRed:0.820f green:0.820f blue:0.820f alpha:1.000f],
[UIColor colorWithRed:0.929f green:0.929f blue:0.929f alpha:1.000f],
[UIColor colorWithRed:0.961f green:0.961f blue:0.961f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:0.200f],
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:0.122f],
[UIColor colorWithRed:0.820f green:0.820f blue:0.820f alpha:1.000f],
[UIColor colorWithRed:0.929f green:0.929f blue:0.929f alpha:1.000f],
[UIColor colorWithRed:0.918f green:0.941f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.659f green:0.659f blue:0.659f alpha:1.000f],
[UIColor colorWithRed:0.961f green:0.961f blue:0.961f alpha:1.000f],
[UIColor colorWithRed:0.820f green:0.820f blue:0.820f alpha:1.000f],
[UIColor colorWithRed:0.502f green:0.502f blue:0.502f alpha:0.549f],
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:0.078f],
[UIColor colorWithRed:0.922f green:0.929f blue:0.941f alpha:1.000f],
[UIColor colorWithRed:0.106f green:0.122f blue:0.149f alpha:0.722f],
[UIColor colorWithRed:0.961f green:0.961f blue:0.961f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:0.302f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f],
[UIColor colorWithRed:0.102f green:0.102f blue:0.102f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:0.078f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:1.000f green:1.000f blue:1.000f alpha:1.000f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f],
[UIColor colorWithRed:0.000f green:0.000f blue:0.000f alpha:0.200f],
[UIColor colorWithRed:0.227f green:0.424f blue:0.871f alpha:1.000f]
    ];
  });

  return colorArray;
}

@end
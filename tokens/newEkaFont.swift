//
//  File.swift
//
//
//  Created by Lourdes Dinesh on 17/07/23.
//
import UIKit
import SwiftUI

public enum NewEkaFont {
    // MARK: - Large Title
    case largeTitleRegular
    case largeTitleEmphasized
    
    // MARK: - Title 1
    case title1Regular
    case title1Emphasized
    
    // MARK: - Title 2
    case title2Regular
    case title2Emphasized
    
    // MARK: - Title 3
    case title3Regular
    case title3Emphasized
    
    // MARK: - Headline
    case headlineRegular
    case headlineItalic
    
    // MARK: - Body
    case bodyRegular
    case bodyEmphasized
    case bodyItalic
    case bodyEmphasizedItalic
    
    // MARK: - Callout
    case calloutRegular
    case calloutEmphasized
    case calloutItalic
    case calloutEmphasizedItalic
    
    // MARK: - Subheadline
    case subheadlineRegular
    case subheadlineEmphasized
    case subheadlineItalic
    case subheadlineEmphasizedItalic
    
    // MARK: - Footnote
    case footnoteRegular
    case footnoteEmphasized
    case footnoteItalic
    case footnoteEmphasizedItalic
    
    // MARK: - Caption 1
    case caption1Regular
    case caption1Emphasized
    case caption1Italic
    case caption1EmphasizedItalic
    
    // MARK: - Caption 2
    case caption2Regular
    case caption2Emphasized
    case caption2Italic
    case caption2EmphasizedItalic

}
    
    // MARK: - Get UIFont
    extension NewEkaFont {

        public var font: UIFont {
        switch self {
        // Large Title
        case .largeTitleRegular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 32.0)!
        case .largeTitleEmphasized:
            return UIFont(name: EkaUI.CustomFontNames.bold.rawValue, size: 32.0)!

        // Title 1
        case .title1Regular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 28.0)!
        case .title1Emphasized:
            return UIFont(name: EkaUI.CustomFontNames.bold.rawValue, size: 28.0)!

        // Title 2
        case .title2Regular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 24.0)!
        case .title2Emphasized:
            return UIFont(name: EkaUI.CustomFontNames.bold.rawValue, size: 24.0)!

        // Title 3
        case .title3Regular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 20.0)!
        case .title3Emphasized:
            return UIFont(name: EkaUI.CustomFontNames.semiBold.rawValue, size: 20.0)!

        // Headline
        case .headlineRegular:
            return UIFont(name: EkaUI.CustomFontNames.semiBold.rawValue, size: 18.0)!
        case .headlineItalic:
            return UIFont(name: EkaUI.CustomFontNames.semiBoldItalic.rawValue, size: 18.0)!

        // Body
        case .bodyRegular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 16.0)!
        case .bodyEmphasized:
            return UIFont(name: EkaUI.CustomFontNames.semiBold.rawValue, size: 16.0)!
        case .bodyItalic:
            return UIFont(name: EkaUI.CustomFontNames.mediumItalic.rawValue, size: 16.0)!
        case .bodyEmphasizedItalic:
            return UIFont(name: EkaUI.CustomFontNames.semiBoldItalic.rawValue, size: 16.0)!

        // Callout
        case .calloutRegular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 15.0)!
        case .calloutEmphasized:
            return UIFont(name: EkaUI.CustomFontNames.semiBold.rawValue, size: 15.0)!
        case .calloutItalic:
            return UIFont(name: EkaUI.CustomFontNames.mediumItalic.rawValue, size: 15.0)!
        case .calloutEmphasizedItalic:
            return UIFont(name: EkaUI.CustomFontNames.semiBoldItalic.rawValue, size: 15.0)!

        // Subheadline
        case .subheadlineRegular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 14.0)!
        case .subheadlineEmphasized:
            return UIFont(name: EkaUI.CustomFontNames.semiBold.rawValue, size: 14.0)!
        case .subheadlineItalic:
            return UIFont(name: EkaUI.CustomFontNames.mediumItalic.rawValue, size: 14.0)!
        case .subheadlineEmphasizedItalic:
             return UIFont(name: EkaUI.CustomFontNames.semiBoldItalic.rawValue, size: 14.0)!

        // Footnote
        case .footnoteRegular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 13.0)!
        case .footnoteEmphasized:
            return UIFont(name: EkaUI.CustomFontNames.semiBold.rawValue, size: 13.0)!
        case .footnoteItalic:
            return UIFont(name: EkaUI.CustomFontNames.mediumItalic.rawValue, size: 13.0)!
        case .footnoteEmphasizedItalic:
            return UIFont(name: EkaUI.CustomFontNames.semiBoldItalic.rawValue, size: 13.0)!

        // Caption 1
        case .caption1Regular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 12.0)!
        case .caption1Emphasized:
            return UIFont(name: EkaUI.CustomFontNames.medium.rawValue, size: 12.0)!
        case .caption1Italic:
            return UIFont(name: EkaUI.CustomFontNames.mediumItalic.rawValue, size: 12.0)!
        case .caption1EmphasizedItalic:
            return UIFont(name: EkaUI.CustomFontNames.mediumItalic.rawValue, size: 12.0)!

        // Caption 2
        case .caption2Regular:
            return UIFont(name: EkaUI.CustomFontNames.regular.rawValue, size: 11.0)!
        case .caption2Emphasized:
            return UIFont(name: EkaUI.CustomFontNames.semiBold.rawValue, size: 11.0)!
        case .caption2Italic:
            return UIFont(name: EkaUI.CustomFontNames.mediumItalic.rawValue, size: 11.0)!
        case .caption2EmphasizedItalic:
            return UIFont(name: EkaUI.CustomFontNames.semiBoldItalic.rawValue, size: 11.0)!
        }
    }
        

        // MARK: - Get Line height
        public var lineHeight: CGFloat {
            switch self {
            case .largeTitleRegular, .largeTitleEmphasized:
                return 40
                
            case .title1Regular, .title1Emphasized:
                return 32
                
            case .title2Regular, .title2Emphasized:
                return 32
                
            case .title3Regular, .title3Emphasized:
                return 28
                
            case .headlineRegular, .headlineItalic:
                return 24
                
            case .bodyRegular, .bodyEmphasized, .bodyItalic, .bodyEmphasizedItalic:
                return 24
                
            case .calloutRegular, .calloutEmphasized, .calloutItalic, .calloutEmphasizedItalic:
                return 20
                
            case .subheadlineRegular, .subheadlineEmphasized, .subheadlineItalic, .subheadlineEmphasizedItalic:
                return 20
                
            case .footnoteRegular, .footnoteEmphasized, .footnoteItalic, .footnoteEmphasizedItalic:
                return 18
                
            case .caption1Regular, .caption1Emphasized, .caption1Italic, .caption1EmphasizedItalic:
                return 16
                
            case .caption2Regular, .caption2Emphasized, .caption2Italic, .caption2EmphasizedItalic:
                return 13
            }
        }
    }

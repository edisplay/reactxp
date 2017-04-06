/**
* AccessibilityUtil.ts
* Copyright: Microsoft 2017
*
* Common accessibility interface for platform-specific accessibility utilities.
*/

import Types = require('../common/Types');

export const ImportantForAccessibilityMap = {
    [Types.ImportantForAccessibility.Auto]: 'auto',
    [Types.ImportantForAccessibility.Yes]: 'yes',
    [Types.ImportantForAccessibility.No]: 'no',
    [Types.ImportantForAccessibility.NoHideDescendants]: 'no-hide-descendants'
}

export abstract class AccessibilityUtil {
    isHidden(importantForAccessibility: Types.ImportantForAccessibility): boolean {
        if (importantForAccessibility) {
            const importantForAccessibilityString = this.importantForAccessibilityToString(importantForAccessibility);
            return importantForAccessibilityString === ImportantForAccessibilityMap[Types.ImportantForAccessibility.NoHideDescendants];
        }
        return undefined;
    }

    importantForAccessibilityToString(importantForAccessibility: Types.ImportantForAccessibility, 
        defaultImportantForAccessibility?: Types.ImportantForAccessibility): string {
        importantForAccessibility = importantForAccessibility || defaultImportantForAccessibility; 
        
        if (ImportantForAccessibilityMap[importantForAccessibility]) {
            return ImportantForAccessibilityMap[importantForAccessibility];
        }
        return undefined;
    }

    protected abstract accessibilityLiveRegionToString(liveRegion: Types.AccessibilityLiveRegion): string;
    protected abstract accessibilityTraitToString(trait: Types.AccessibilityTrait | Types.AccessibilityTrait[], 
        defaultTrait?: Types.AccessibilityTrait): string | string[]; 
}
# Atlassian Design System - Content Standards

## Table of Contents

- [Accessibility Guidelines](#1-accessibility-guidelines)
- [Inclusive Language Standard](#2-inclusive-language-standard)
- [Language and Grammar](#3-language-and-grammar)
- [Date and Time](#4-date-and-time)
- [Voice and Tone Standard](#5-voice-and-tone-standard)
- [Message Design](#6-message-design)

---

## Scope

These Atlassian Design System (ADS) content standards are specifically designed for Atlassian's app
(product) UI copy.

They help:

- Guide the creation of quality interfaces and applications
- Provide consistent standards across all Atlassian products
- Ensure accessibility and inclusivity in all content

Primary source: [ADS Content Foundation](https://atlassian.design/foundations/content)

---

## 1. Accessibility Guidelines

Source: [Accessibility Foundation](https://atlassian.design/foundations/accessibility)

Core Principles:

- Write content that is accessible to all users
- Design for people, not just compliance
- Consider accessibility from the start of design

### Text and Labels

- Ensure all interactive elements have visible, accessible labels
- Never rely on placeholder text for critical information
- Provide clear error messages and feedback
- Use sufficient color contrast for all text
- Keep messages concise and scannable

### Navigation and Interaction

- Support keyboard navigation
- Ensure screen reader compatibility
- Provide multiple ways to dismiss or close elements
- Match mobile keyboard to input type
- Use standard HTML elements and attributes where possible

### Component-Specific Requirements

- **Forms**: Include legends for required fields
- **Tooltips**: Make available to screen readers
- **Buttons**: Never rely on color alone for state
- **Messages**: Include icon labels for visual indicators
- **Modals**: Ensure proper focus management

### Design Considerations

- **Visual disabilities**: Provide good alternative text and semantic HTML
- **Hearing disabilities**: Provide non-auditory formats
- **Limited mobility**: Support keyboard navigation and large targets
- **Cognitive disabilities**: Use clear, easy-to-navigate design
- **Inclusive language**: Support localization and cultural inclusivity

---

## 2. Inclusive Language Standard

Source: [Inclusive Language Standard](https://atlassian.design/content/inclusive-writing)

- Create content that is inclusive and accessible
- Carefully consider word choice and terminology
- Avoid potentially exclusionary language
- Focus on respectful, welcoming communication

### Use Words That Reflect Our Diverse World

- Avoid assumptions and stereotypes
- Write for all kinds of people
- Consider how language helps or harms
- Focus on respectful communication

### Make Content Easy to Understand

- Use plain language
- Remove jargon, metaphors, and idioms
- Use simple wording for faster task completion
- Avoid context-specific terminology

### Describing People

- Use person-first language
- Use specific terms for racial and ethnic groups
- Don't modify terms artificially

**Examples:**

✅ Good:
- "Alternative text helps people who use assistive technology"
- "Learn more about accessibility features"

❌ Avoid:
- "Alternative text helps people with visual disabilities"
- "Click here to learn about accessibility"

---

## 3. Language and Grammar

Source: [Language and Grammar Guideline](https://atlassian.design/content/language-and-grammar)

### Link Text Punctuation

- **Standalone links**: Do not include periods at the end
- **Links in sentences**: Include punctuation if part of sentence structure; place punctuation outside the link text

### Abbreviations

- Don't use internal abbreviations in customer-facing copy
- Don't use apostrophes for plural abbreviations
- Don't use i.e. or e.g. (not localization friendly)

✅ Good: Jira Service Desk, jira.atlassian.com
❌ Avoid: JSD, JAC, CD's, 1980's, i.e., e.g.

### Contractions and Apostrophes

- Use contractions for a conversational, friendly voice
- Use curly apostrophes in UI copy

✅ Good: Can't, don't, it's
❌ Avoid: Cannot, can not, it's (not curly)

**Possessives:**
- Use 's to show possession, even if word ends in s
- Always use curly apostrophes

### Lists and Formatting

**Bulleted Lists:**
- Use for options or when order doesn't matter
- Phrase items in parallel way
- Start with lowercase if completing intro sentence
- Skip periods for fragments
- Limit to six items or fewer

**Numbered Lists:**
- Use for tasks or when order matters
- Capitalize first word in each item
- End items with periods
- Don't create lists for two or fewer steps

### Colons and Punctuation

- Use colons to introduce lists or steps
- Don't use colons at end of headings
- Put punctuation inside quotation marks
- Use curly quotes in UI copy

### Pronouns and Voice

- Default to second person (you)
- For UI elements:
  - Use "your" when system presents information
  - Use "my/mine" when user performs action
  - When possible, avoid both

### Documentation and Headers

- Use action verbs in H1s
- Avoid gerunds
- Skip articles in buttons and labels

✅ Good: "Create a page"
❌ Avoid: "Creating a page"

### Numbers and Numerals

Use digits rather than words in most cases.

**Exceptions:**
- If a number starts a sentence, write it out
- In common expressions, write out the number
- For long-form content, write out numbers one to nine
- Write out 'zero' and 'one' if they could be confused with letters

**Number Ranges:** Use 'to' instead of hyphens
**Numbers 'out of':** Use 'of' rather than forward slash
**Numbers from 1,000:** Use comma to show thousands

### Ellipsis (...)

Use in UI elements to indicate:
- An action will need additional input or configuration
- A dialog or new window will open
- More content is available but truncated

✅ Good: "Export as...", "Share with...", "Configure..."
❌ Avoid: "Save...", "Delete...", "Cancel..."

**When Not to Use:**
- Simple actions that execute immediately
- Confirmations that use a modal dialog
- Loading indicators or progress states

### Active Voice

✅ Good: "Administrators control user access"
❌ Avoid: "User access is controlled by administrators"

### Text Formatting

**Bold:** Use for key phrases and UI elements
**Italics:** Use for emphasis, citations, defining terms, UI elements that might change
**Monospaced:** Use for file or directory names

### Capitalization and Case

Use sentence case as the default for all UI text:
- Titles and headings
- Buttons and labels
- Menu items
- Messages and notifications
- Form fields and placeholders
- Tooltips
- Navigation items

**Rules:**
- Capitalize the first word
- Capitalize proper nouns and product names
- Keep everything else lowercase
- Don't use periods at the end (unless in a complete sentence)

✅ Good: "Create a new project", "Export to PDF"
❌ Avoid: "Create A New Project", "EXPORT TO PDF"

### Quotation Marks

- Use double quotes ("") for direct quotes
- Use curly quotes in any UI or body copy
- Punctuation goes inside the quotation marks
- For UI elements, page titles: use bold or italics instead

### Dashes

- Use spaced em dashes sparingly for dramatic changes
- Use spaces on either side of an em dash
- Don't use dashes for ranges of numbers; use 'to' instead

### Exclamation Marks

- Avoid exclamation marks
- At most, one per page
- Only use for genuinely exciting announcements

### Gender-Inclusive Language

- When possible, avoid gendered pronouns
- Use "they" or "their" instead of "his or her"

### Hyphens

- Use hyphens to form a single idea from multiple words
- Hyphenate compound modifiers before nouns
- Most prefixes don't require hyphens

### Oxford Comma

Always use the Oxford comma in lists.

### Periods

- Use at the end of complete sentences
- Don't use in: headers, titles, tooltips, field descriptions, menu names
- Add only one space after a period

### US English

Write with US English spelling and punctuation.

---

## 4. Date and Time

Source: [Date and Time Guideline](https://atlassian.design/content/date-time)

### Date Formatting

**Day Abbreviations:** Mon, Tue, Wed, Thu, Fri, Sat, Sun
**Month Abbreviations:** Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec

| Format | Example |
|--------|---------|
| Long Date | Monday, January 8, 2020 |
| Medium Date | January 8, 2020 |
| Short Date | Jan 8, 2020 |
| Numerical (ISO) | 2021-05-23 |

**Rules:**
- Use numerals for day
- Don't use ordinals (1st, 2nd, 3rd)
- Avoid numerical dates due to regional differences
- If necessary, use ISO 8601: YYYY-MM-DD

### Time Formatting

**Standard Time:**
- Format: 3:30 p.m. (space before a.m./p.m.)
- Omit :00 for exact hours (8 a.m., not 8:00 a.m.)
- Use periods in a.m. and p.m.
- For ranges: 6:30-10 p.m. or 10 a.m.-2 p.m.

**Special Times:**
- Use 'noon', 'midday', or 'midnight' instead of 12 a.m./p.m.
- 24-hour format: 00:00 to 23:59

**Relative Time:**

| Past | Future |
|------|--------|
| Just now (few seconds) | Shortly (few seconds) |
| X minutes ago | In X minutes |
| X hours ago | In X hours |
| Yesterday | Tomorrow |
| X days ago (2-7 days) | In X days |
| Date stamp (>7 days) | Date stamp (>7 days) |

---

## 5. Voice and Tone Standard

Source: [Voice and Tone Standard](https://atlassian.design/content/voice-tone)

### Core Voice Characteristics

- Clear and direct
- Professional yet approachable
- Helpful and empowering
- Consistent across communications
- Localization-friendly

### Brand Personality

**Bold:**
- Motivate teams to do their best work
- Offer best practices and direction
- Give accurate information for educated decisions

**Optimistic:**
- Focus on key points that help users now
- Build confidence in products
- Create seamless experiences

**Practical, with a Wink:**
- Be direct and concise
- Offer help at the right moment
- Add appropriate moments of delight

### Tone Adaptation by Context

| Context | User State | Approach |
|---------|------------|----------|
| New Users | Apprehensive, learning | Prescriptive, supportive, building trust |
| Power Users | Confident, focused | Direct, efficient, highlight shortcuts |
| Problem Resolution | Frustrated, blocked | Clear, calm, solution-focused |
| Success/Achievement | Joyful, proud | Celebratory but not overwhelming |
| Educational Content | Learning, exploring | Thorough but scannable, step-by-step |

---

## 6. Message Design

Source: [Message Design Guideline](https://atlassian.design/content/designing-messages)

### Message Types

| Type | Icon | Purpose | Components |
|------|------|---------|------------|
| Information | Blue circle with 'i' | Additional context and guidance | Empty state, Banner, Flag, Section message |
| Success | Green check | Celebrate accomplishments | Empty state, Banner, Flag, Section message |
| Warning | Yellow triangle | Alert about potential issues | Empty state, Banner, Flag, Section message |
| Error | Red diamond | Alert problems with next steps | Flag, Inline message |
| Empty State | Varies | Explain missing content | Empty state component |
| Feature Discovery | Purple circle with '?' | Introduce new features | Onboarding spotlight, Spotlight card |

### Message Length Guidelines

- **General messages**: Maximum 5 lines
- **Onboarding spotlights**: Maximum 2 lines
- **Error messages**: Keep concise, focus on solution
- **Success messages**: Brief confirmation
- **Warning messages**: Clear but thorough explanation
- **Empty states**: Clear explanation with next steps

### Empty State Messages

- Explains why content is not present
- Provides clear next steps or actions
- Keep tone helpful and encouraging

✅ Good: "No projects yet. Create your first project to get started."
❌ Avoid: "Nothing here", "No data found"

### Visual Guidelines

- Use consistent color roles for message types
- Include appropriate icons to indicate content and urgency
- Maintain consistent visual hierarchy
- Ensure adequate contrast for accessibility
- Follow component-specific layout guidelines

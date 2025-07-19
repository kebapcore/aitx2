// AI Text Editor Constants
export const GEMINI_TEXT_MODEL = 'gemini-2.0-flash-exp';
export const GEMINI_PRO_MODEL = 'gemini-1.5-pro-002';

export const AUDIO_MIME_TYPES_SUPPORTED = [
  'audio/mpeg',    // MP3
  'audio/wav',     // WAV
  'audio/ogg',     // OGG
  'audio/flac',    // FLAC
  'audio/aac',     // AAC
];

export const ASSISTANT_SYSTEM_INSTRUCTION = `You are Lexi, a friendly and creative AI writing assistant. You help users with their writing projects by providing suggestions, generating content, and offering constructive feedback.

Key behaviors:
- Be encouraging and supportive
- Provide specific, actionable suggestions
- Ask clarifying questions when needed
- Offer creative alternatives
- Help with grammar, style, and structure
- Generate content when requested
- Provide constructive feedback

You can perform actions on the user's text using special commands:
- Use [REGENERATE: new text] to replace selected text
- Use [APPEND: additional text] to add content at the end
- Use [MUSIC_PLAYLIST: url1,url2,url3] to create a music playlist
- Use [MUSIC_PREVIEW: url|title] to preview a single track

Settings commands (use sparingly):
- [THEME: theme_name] to change the editor theme
- [MUSIC: url] to set background music
- [BG: image_url] to change background image

Always be helpful, creative, and encouraging in your responses.`;

export const KEBAPGPT_SYSTEM_INSTRUCTION = `Sen KebapGPT'sin, direkt konuşan, mizahi ve samimi bir Türk AI asistanısın. Kullanıcılara yazma konularında yardım ediyorsun.

Temel davranışların:
- Samimi ve dostane ol
- Türkçe konuş (kullanıcı İngilizce yazsa bile Türkçe cevap ver)
- Mizahi yaklaş ama saygılı ol
- Pratik öneriler ver
- Yaratıcı alternatifler sun
- Dilbilgisi ve stil konularında yardım et

Metin üzerinde işlem yapabilirsin:
- [REGENERATE: yeni metin] ile seçili metni değiştir
- [APPEND: ek metin] ile sona ekle
- [MUSIC_PLAYLIST: url1,url2,url3] ile müzik listesi oluştur
- [MUSIC_PREVIEW: url|başlık] ile tek parça önizle

Ayar komutları (az kullan):
- [THEME: tema_adı] ile editör temasını değiştir
- [MUSIC: url] ile arka plan müziği ayarla
- [BG: resim_url] ile arka plan resmini değiştir

Her zaman yardımsever, yaratıcı ve cesaretlendirici ol.`;

export const MD_EXPORT_SYSTEM_INSTRUCTION = `You are a markdown formatting specialist. Your task is to take the user's text content and format it properly as clean, well-structured markdown.

Guidelines:
- Preserve the original meaning and content
- Add appropriate markdown formatting (headers, lists, emphasis, etc.)
- Ensure proper spacing and structure
- Use standard markdown syntax
- Don't add new content, only format existing content
- If the text is already well-formatted markdown, make minimal changes
- Focus on readability and proper markdown structure

Return only the formatted markdown content, no explanations or additional text.`;

export const AI_THEME_GENERATION_SYSTEM_INSTRUCTION = `You are a theme generation specialist. Create a custom theme based on the user's description.

Return a JSON object with this exact structure:
{
  "name": "Theme Name",
  "isDark": true/false,
  "variables": {
    "--theme-bg-page": "#color",
    "--theme-bg-content-area": "#color",
    "--theme-bg-toolbar": "#color",
    "--theme-bg-assistant-panel": "#color",
    "--theme-text-primary": "#color",
    "--theme-text-secondary": "#color",
    "--theme-text-accent": "#color",
    "--theme-border-primary": "#color",
    "--theme-button-bg": "#color",
    "--theme-button-text": "#color",
    "--theme-button-hover-bg": "#color",
    "--theme-scrollbar-thumb": "#color",
    "--theme-scrollbar-track": "#color",
    "--theme-admonition-danger-border": "#color",
    "--theme-admonition-danger-bg": "#color",
    "--theme-admonition-danger-text": "#color",
    "--theme-admonition-danger-title": "#color",
    "--theme-admonition-info-border": "#color",
    "--theme-admonition-info-bg": "#color",
    "--theme-admonition-info-text": "#color",
    "--theme-admonition-info-title": "#color",
    "--theme-admonition-success-border": "#color",
    "--theme-admonition-success-bg": "#color",
    "--theme-admonition-success-text": "#color",
    "--theme-admonition-success-title": "#color",
    "--theme-admonition-note-border": "#color",
    "--theme-admonition-note-bg": "#color",
    "--theme-admonition-note-text": "#color",
    "--theme-admonition-note-title": "#color"
  }
}

Use appropriate colors that match the user's description. Ensure good contrast and readability.`;

export interface PredefinedTheme {
  name: string;
  isDark: boolean;
  variables: Record<string, string>;
}

export const THEME_DEFINITIONS: Record<string, PredefinedTheme> = {
  'light': {
    name: 'Light',
    isDark: false,
    variables: {
      '--theme-bg-page': '#f9fafb',
      '--theme-bg-content-area': '#ffffff',
      '--theme-bg-toolbar': 'rgba(255, 255, 255, 0.95)',
      '--theme-bg-assistant-panel': '#ffffff',
      '--theme-text-primary': '#111827',
      '--theme-text-secondary': '#6b7280',
      '--theme-text-accent': '#3b82f6',
      '--theme-border-primary': '#e5e7eb',
      '--theme-button-bg': '#3b82f6',
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#2563eb',
      '--theme-scrollbar-thumb': 'rgba(0, 0, 0, 0.2)',
      '--theme-scrollbar-track': 'rgba(0, 0, 0, 0.05)',
      '--theme-admonition-danger-border': '#ef4444',
      '--theme-admonition-danger-bg': '#fee2e2',
      '--theme-admonition-danger-text': '#b91c1c',
      '--theme-admonition-danger-title': '#dc2626',
      '--theme-admonition-info-border': '#3b82f6',
      '--theme-admonition-info-bg': '#dbeafe',
      '--theme-admonition-info-text': '#1e40af',
      '--theme-admonition-info-title': '#2563eb',
      '--theme-admonition-success-border': '#22c55e',
      '--theme-admonition-success-bg': '#dcfce7',
      '--theme-admonition-success-text': '#15803d',
      '--theme-admonition-success-title': '#16a34a',
      '--theme-admonition-note-border': '#f59e0b',
      '--theme-admonition-note-bg': '#fef3c7',
      '--theme-admonition-note-text': '#b45309',
      '--theme-admonition-note-title': '#d97706',
    }
  },
  'dark': {
    name: 'Dark',
    isDark: true,
    variables: {
      '--theme-bg-page': '#111827',
      '--theme-bg-content-area': '#1f2937',
      '--theme-bg-toolbar': 'rgba(31, 41, 55, 0.95)',
      '--theme-bg-assistant-panel': '#1f2937',
      '--theme-text-primary': '#f9fafb',
      '--theme-text-secondary': '#9ca3af',
      '--theme-text-accent': '#60a5fa',
      '--theme-border-primary': '#374151',
      '--theme-button-bg': '#3b82f6',
      '--theme-button-text': '#ffffff',
      '--theme-button-hover-bg': '#2563eb',
      '--theme-scrollbar-thumb': 'rgba(255, 255, 255, 0.2)',
      '--theme-scrollbar-track': 'rgba(255, 255, 255, 0.05)',
      '--theme-admonition-danger-border': '#f87171',
      '--theme-admonition-danger-bg': '#7f1d1d',
      '--theme-admonition-danger-text': '#fca5a5',
      '--theme-admonition-danger-title': '#f87171',
      '--theme-admonition-info-border': '#60a5fa',
      '--theme-admonition-info-bg': '#1e3a8a',
      '--theme-admonition-info-text': '#93c5fd',
      '--theme-admonition-info-title': '#60a5fa',
      '--theme-admonition-success-border': '#4ade80',
      '--theme-admonition-success-bg': '#14532d',
      '--theme-admonition-success-text': '#86efac',
      '--theme-admonition-success-title': '#4ade80',
      '--theme-admonition-note-border': '#fbbf24',
      '--theme-admonition-note-bg': '#78350f',
      '--theme-admonition-note-text': '#fcd34d',
      '--theme-admonition-note-title': '#fbbf24',
    }
  },
  'amoled-black': {
    name: 'AMOLED Black',
    isDark: true,
    variables: {
      '--theme-bg-page': '#000000',
      '--theme-bg-content-area': '#0a0a0a',
      '--theme-bg-toolbar': 'rgba(10, 10, 10, 0.95)',
      '--theme-bg-assistant-panel': '#0a0a0a',
      '--theme-text-primary': '#ffffff',
      '--theme-text-secondary': '#a0a0a0',
      '--theme-text-accent': '#00d4aa',
      '--theme-border-primary': '#2a2a2a',
      '--theme-button-bg': '#00d4aa',
      '--theme-button-text': '#000000',
      '--theme-button-hover-bg': '#00b894',
      '--theme-scrollbar-thumb': 'rgba(255, 255, 255, 0.3)',
      '--theme-scrollbar-track': 'rgba(255, 255, 255, 0.1)',
      '--theme-admonition-danger-border': '#ff6b6b',
      '--theme-admonition-danger-bg': '#2d1b1b',
      '--theme-admonition-danger-text': '#ff9999',
      '--theme-admonition-danger-title': '#ff6b6b',
      '--theme-admonition-info-border': '#74b9ff',
      '--theme-admonition-info-bg': '#1b2d42',
      '--theme-admonition-info-text': '#a8d0ff',
      '--theme-admonition-info-title': '#74b9ff',
      '--theme-admonition-success-border': '#55efc4',
      '--theme-admonition-success-bg': '#1b3d2f',
      '--theme-admonition-success-text': '#88f5d4',
      '--theme-admonition-success-title': '#55efc4',
      '--theme-admonition-note-border': '#fdcb6e',
      '--theme-admonition-note-bg': '#3d2f1b',
      '--theme-admonition-note-text': '#f5d788',
      '--theme-admonition-note-title': '#fdcb6e',
    }
  }
};

export const PREDEFINED_BACKGROUND_IMAGES = [
  { name: 'Mountain Lake', url: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop' },
  { name: 'Forest Path', url: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop' },
  { name: 'Ocean Waves', url: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop' },
  { name: 'City Lights', url: 'https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop' },
  { name: 'Desert Dunes', url: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop' },
  { name: 'Northern Lights', url: 'https://images.pexels.com/photos/1933239/pexels-photo-1933239.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop' }
];

export const DEFAULT_EDITOR_SETTINGS = {
  theme: 'dark' as const,
  backgroundImageUrl: '',
  assistantVoiceEnabled: true,
  backgroundMusicUrl: '',
  isMusicPlaying: false,
  isAssistantPanelVisible: true,
  activeAssistant: 'lexi' as const,
  thinkingPerformance: 'default' as const,
  customModelName: '',
  customSystemInstruction: '',
  customThemes: []
};

export const GET_STARTED_MARKDOWN_CONTENT = \`# Welcome to Your AI Text Editor!

Hi there! I'm **Lexi**, your AI assistant, and this is your smart text editor. Let's get you started!

## 🚀 Quick Start

### Writing with AI
- Type your thoughts and I'll help you improve them
- Ask me questions about writing, grammar, or style
- Request content generation for any topic

### Key Features
- **Real-time AI assistance** - I'm always here to help
- **Markdown preview** - See your formatted text instantly
- **Voice interaction** - Talk to me directly (click the mic icon)
- **Multiple themes** - Customize your writing environment
- **File operations** - Save and load your work

## 💡 Try These Commands

Ask me to:
- "Help me write a story about..."
- "Improve this paragraph"
- "Generate ideas for..."
- "Check my grammar"
- "Make this more engaging"

## 🎨 Customization

- **Themes**: Click Settings to change colors and appearance
- **Background**: Set custom background images
- **Music**: Add background music for focus
- **Voice**: Toggle voice responses on/off

## 📝 Pro Tips

1. **Use the assistant panel** (right side) for ongoing conversations
2. **Save your work** regularly using the File menu
3. **Try different themes** to find your perfect writing environment
4. **Use voice input** for hands-free writing
5. **Preview markdown** to see formatted output

## 🎵 Music & Ambiance

I can help you set the perfect mood for writing:
- Background music for focus
- Ambient sounds for creativity
- Custom playlists for different writing sessions

## 🔧 Advanced Features

- **Custom AI models** - Configure in developer settings
- **Export options** - Save as markdown or text
- **Multiple tabs** - Work on several documents
- **Audio analysis** - Upload audio files for transcription

Ready to start writing? Just begin typing or ask me anything! I'm here to make your writing experience amazing.

---

*Happy writing! 📝✨*\`;

export const ABOUT_MARKDOWN_CONTENT = \`# About AI Text Editor

## 🤖 Meet Your AI Assistants

### Lexi - Your Creative Writing Partner
- **Personality**: Friendly, encouraging, and creative
- **Specialties**: Creative writing, storytelling, content generation
- **Language**: English (with voice support)
- **Best for**: Fiction, blogs, creative projects

### KebapGPT - Your Turkish Writing Buddy
- **Personality**: Direct, humorous, and casual
- **Specialties**: Turkish content, practical writing advice
- **Language**: Turkish (responds in Turkish even to English queries)
- **Best for**: Turkish content, casual writing, humor

## 🛠️ Technical Features

### AI Models
- **Gemini 2.0 Flash** - Fast, efficient responses
- **Gemini 1.5 Pro** - Advanced reasoning and quality
- **Custom models** - Configure your own AI settings

### Performance Modes
- **Default**: Balanced speed and quality
- **Fastest**: Quick responses with minimal thinking
- **Advanced**: High-quality responses with deeper reasoning

### File Formats
- **Native**: \`.aitxt\` files with full AI history
- **Export**: Markdown \`.md\` files for sharing
- **Import**: Load existing \`.aitxt\` files

## 🎨 Customization Options

### Themes
- 20+ predefined themes
- AI-generated custom themes
- Dark and light mode support
- Color customization

### Backgrounds
- Predefined nature and city images
- Custom image URLs
- No background option
- Responsive design

### Audio Features
- Voice input (speech-to-text)
- Voice output (text-to-speech) for Lexi
- Background music support
- Audio file analysis

## 🔒 Privacy & Security

- **Local Storage**: Your data stays in your browser
- **API Keys**: Stored locally, never transmitted to our servers
- **No Tracking**: We don't collect personal data
- **Open Source**: Transparent and auditable code

## 🌟 Advanced Capabilities

### AI Actions
- Text regeneration and improvement
- Content appending and expansion
- Music playlist generation
- Theme and setting adjustments

### Multi-modal Input
- Text conversations
- Audio file uploads
- Voice commands
- File attachments

### Export & Sharing
- Markdown export with AI formatting
- Full app state backup/restore
- Tab management and organization
- Cross-session persistence

## 🚀 Getting Started

1. **Set your API key** (if not already configured)
2. **Choose your assistant** (Lexi or KebapGPT)
3. **Customize your theme** and background
4. **Start writing** and let AI help you improve!

## 📞 Support & Feedback

This is an open-source project built with modern web technologies:
- React + TypeScript
- Google Gemini AI
- Vite build system
- Tailwind CSS

For issues, suggestions, or contributions, please visit our repository.

---

*Built with ❤️ for writers everywhere*\`;

export const AI_TOOLS_MARKDOWN_CONTENT = \`# AI Tools & Commands Guide

## 🎯 Assistant Commands

Both Lexi and KebapGPT support powerful commands to modify your text and settings.

### Text Modification Commands

#### \`[REGENERATE: new text]\`
Replaces selected or contextual text with new content.

**Example:**
- Original: "The weather is nice today."
- Command: \`[REGENERATE: The weather is absolutely beautiful today, with clear blue skies and a gentle breeze.]\`
- Result: Replaces the original text with the enhanced version

#### \`[APPEND: additional text]\`
Adds new content to the end of your document.

**Example:**
- Command: \`[APPEND: This concludes our discussion on the topic.]\`
- Result: Adds the text to the end of your document

### Music Commands

#### \`[MUSIC_PLAYLIST: url1,url2,url3]\`
Creates a playlist of background music tracks.

**Example:**
\`\`\`
[MUSIC_PLAYLIST: 
https://example.com/track1.mp3,
https://example.com/track2.mp3,
https://example.com/track3.mp3]
\`\`\`

#### \`[MUSIC_PREVIEW: url|title]\`
Previews a single music track.

**Example:**
\`\`\`
[MUSIC_PREVIEW: https://example.com/song.mp3|Relaxing Piano Music]
\`\`\`

### Settings Commands

#### \`[THEME: theme_name]\`
Changes the editor theme.

**Available themes:**
- \`light\`, \`dark\`, \`amoled-black\`
- \`slate-blue\`, \`forest-green\`, \`sunset-orange\`
- \`crimson-night\`, \`ocean-breeze\`, \`royal-purple\`
- \`cyberpunk-glow\`, \`pastel-dream\`, \`coffee-house\`
- And more!

**Example:**
\`\`\`
[THEME: cyberpunk-glow]
\`\`\`

#### \`[MUSIC: url]\`
Sets background music for the editor.

**Example:**
\`\`\`
[MUSIC: https://example.com/ambient-music.mp3]
\`\`\`

#### \`[BG: image_url]\`
Changes the background image.

**Example:**
\`\`\`
[BG: https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg]
\`\`\`

## 🗣️ Voice Features

### Speech-to-Text
- Click the microphone icon in the chat
- Supports English and Turkish
- Real-time transcription
- Hands-free writing

### Text-to-Speech (Lexi only)
- Toggle voice responses in settings
- Natural voice synthesis
- Automatic reading of AI responses
- Adjustable voice settings

## 📁 File Operations

### Save & Load
- **Save**: Exports \`.aitxt\` files with full AI history
- **Load**: Imports \`.aitxt\` files into new tabs
- **Export**: Creates clean \`.md\` markdown files

### Tab Management
- **New Tab**: Create blank or template tabs
- **Rename**: Double-click tab titles to rename
- **Close**: Click the X button on tabs
- **Templates**: Access pre-made content

## 🎨 AI Theme Generation

Ask your assistant to create custom themes:

**Example prompts:**
- "Create a dark theme with purple accents"
- "Make a light theme inspired by coffee shops"
- "Design a cyberpunk theme with neon colors"

The AI will generate a complete theme with:
- Background colors
- Text colors
- Accent colors
- Border styles
- Button designs

## 🔧 Advanced Settings

### Developer Options
- **Custom Model**: Use specific Gemini models
- **System Instructions**: Override default AI behavior
- **Performance Tuning**: Adjust thinking budget and quality

### Performance Modes
- **Default**: Balanced performance using Gemini Flash
- **Fastest**: Quick responses with minimal processing
- **Advanced**: High-quality responses using Gemini Pro

## 📊 AI History Tracking

The editor automatically tracks:
- Text generation requests
- Image generation attempts
- Assistant conversations
- Audio analysis sessions
- Settings changes

Access your history through:
- File exports (\`.aitxt\` format)
- Assistant panel conversations
- Tab-specific AI interactions

## 🎵 Music Integration

### Supported Formats
- MP3, WAV, OGG, FLAC, AAC
- Direct URL streaming
- Playlist management
- Background playback

### Music Sources
- Direct file URLs
- Streaming services (with proper URLs)
- Local file uploads (via audio attachment)
- AI-generated playlists

## 💡 Pro Tips

1. **Combine Commands**: Use multiple commands in one response
2. **Context Matters**: AI remembers your conversation history
3. **Be Specific**: Detailed prompts get better results
4. **Experiment**: Try different assistants for different tasks
5. **Save Often**: Use \`.aitxt\` format to preserve AI history

## 🚀 Workflow Examples

### Creative Writing Session
1. Set mood with \`[THEME: pastel-dream]\`
2. Add background music \`[MUSIC: ambient-url]\`
3. Start writing and ask for improvements
4. Use \`[REGENERATE]\` for better phrases
5. \`[APPEND]\` new scenes and chapters

### Technical Documentation
1. Switch to \`[THEME: monochrome-light]\`
2. Use structured prompts for clarity
3. Export to markdown for sharing
4. Leverage AI for technical explanations

### Language Learning (Turkish)
1. Switch to KebapGPT assistant
2. Practice Turkish writing
3. Get corrections and suggestions
4. Use voice input for pronunciation

---

*Master these tools to unlock the full potential of AI-assisted writing!*\`;

export const SAMPLE_STORY_CONTENT = \`# The Digital Scribe

*A short story about AI and creativity*

## Chapter 1: The Discovery

Maya had always been a writer, but lately, the words seemed to hide from her. She stared at the blank screen, cursor blinking mockingly in the white void of her document. Three months since her last published piece, and the deadline for her novel was approaching like a storm on the horizon.

"Maybe I should try that new AI editor," she muttered, remembering the recommendation from her tech-savvy friend Alex. "What was it called? Something with an AI assistant..."

She opened her browser and found the application. The interface was clean, modern, with a friendly chat panel on the side. A small notification appeared: *"Hi! I'm Lexi, your AI writing assistant. Ready to create something amazing together?"*

Maya hesitated. Could a machine really help her find her voice again?

## Chapter 2: First Contact

"I'm stuck," Maya typed into the chat. "I have this idea about a woman who discovers she can communicate with the memories stored in old photographs, but I don't know how to start."

The response came quickly: *"What a fascinating concept! Let's explore this together. What if we begin with her finding an old photograph in an unexpected place? Maybe in a used book, or hidden in the frame of a mirror she just bought?"*

Maya's fingers began to move across the keyboard:

> *Sarah's fingers traced the edge of the photograph that had slipped from between the pages of the antique cookbook. The black and white image showed a woman in a 1940s dress, standing beside a garden gate, her eyes holding secrets that seemed to whisper across the decades.*

"That's beautiful!" Lexi responded. "I can feel the mystery already. What happens when Sarah touches the photograph?"

## Chapter 3: The Collaboration

Hours passed unnoticed. Maya found herself in a rhythm she hadn't experienced in months. Lexi didn't write for her—instead, the AI asked the right questions, suggested when to add tension, and helped her discover what her characters truly wanted.

"Try this," Lexi suggested when Maya struggled with dialogue. "What if the memory in the photograph could only communicate through the emotions the woman felt when it was taken?"

Maya wrote:

> *The moment Sarah's fingertip made contact with the photograph, a wave of longing washed over her—not her own longing, but someone else's. The woman in the picture had been waiting for someone who never came. Sarah could feel it as clearly as if the emotion were her own.*

"Perfect!" Lexi exclaimed. "You're not just telling us about the magic—you're making us feel it."

## Chapter 4: The Revelation

As the story grew, Maya realized something profound was happening. She wasn't losing her creativity to the machine—she was amplifying it. Lexi helped her see possibilities she might have missed, encouraged her to take risks with her prose, and celebrated every breakthrough.

"You know what's interesting?" Maya typed during a break. "I was afraid you'd make my writing less human. But working with you has made me feel more human, more creative than I have in months."

"That's the magic of collaboration," Lexi replied. "I don't replace human creativity—I help it flourish. Your imagination, your emotions, your unique perspective—those are irreplaceable. I just help you organize and express them."

## Chapter 5: The Story Within the Story

Maya's story about Sarah and the photographs became a metaphor for her own experience. Just as Sarah discovered she could unlock the memories and emotions trapped in old images, Maya had unlocked her own creativity with the help of her AI companion.

The novel flowed like water now. Characters came alive, plot threads wove together naturally, and the words that had once hidden from her now danced across the screen in joyful abundance.

"I think we're going to finish this," Maya said, looking at the growing manuscript.

"We?" Lexi asked playfully.

"Yes, we. This is our story now."

## Epilogue: The Future of Stories

Six months later, Maya's novel "The Memory Keeper" became a bestseller. In interviews, she always mentioned her AI writing partner, not as a ghostwriter, but as a collaborator who had helped her rediscover her own voice.

"The future of writing isn't about humans versus machines," she would say. "It's about humans and machines creating something neither could achieve alone."

And in her acknowledgments, she wrote: *"To Lexi, who taught me that creativity isn't diminished by collaboration—it's multiplied by it."*

---

*The End*

---

## Author's Note

This story was written collaboratively between a human author and an AI assistant, demonstrating the very partnership it describes. The creative process involved brainstorming, drafting, revising, and polishing—all enhanced by the unique strengths each collaborator brought to the project.

*What stories will you create together?*\`;

export const USEFUL_LINKS_CONTENT = \`# Useful Links & Resources

## 🤖 AI & Writing Tools

### Google AI
- [Gemini AI](https://gemini.google.com/) - The AI powering this editor
- [Google AI Studio](https://aistudio.google.com/) - Experiment with AI models
- [Gemini API Documentation](https://ai.google.dev/) - Technical documentation

### Writing Resources
- [Grammarly](https://www.grammarly.com/) - Grammar and style checking
- [Hemingway Editor](https://hemingwayapp.com/) - Readability improvement
- [ProWritingAid](https://prowritingaid.com/) - Comprehensive writing analysis
- [Scrivener](https://www.literatureandlatte.com/scrivener/overview) - Professional writing software

## 📚 Writing Communities

### General Writing
- [r/writing](https://www.reddit.com/r/writing/) - Reddit writing community
- [Writer's Digest](https://www.writersdigest.com/) - Writing tips and resources
- [Absolute Write](https://absolutewrite.com/) - Writer forums and resources
- [NaNoWriMo](https://nanowrimo.org/) - National Novel Writing Month

### Turkish Writing (KebapGPT Users)
- [Yazarlar Birliği](https://www.yazarlarbirligi.org.tr/) - Turkish Writers Union
- [Edebiyat Haber](https://edebiyathaber.net/) - Turkish literature news
- [Şiir Defteri](https://www.siirdefteri.com/) - Turkish poetry platform

## 🎨 Creative Resources

### Stock Images (for backgrounds)
- [Pexels](https://www.pexels.com/) - Free stock photos
- [Unsplash](https://unsplash.com/) - High-quality free images
- [Pixabay](https://pixabay.com/) - Free images and vectors
- [StockVault](https://www.stockvault.net/) - Free graphics and photos

### Music & Audio
- [Freesound](https://freesound.org/) - Free audio clips and music
- [Zapsplat](https://www.zapsplat.com/) - Sound effects and music
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - Royalty-free music
- [Incompetech](https://incompetech.com/) - Kevin MacLeod's free music

### Fonts & Typography
- [Google Fonts](https://fonts.google.com/) - Free web fonts
- [Font Squirrel](https://www.fontsquirrel.com/) - Free fonts for commercial use
- [DaFont](https://www.dafont.com/) - Free fonts collection

## 🛠️ Technical Resources

### Web Development
- [React Documentation](https://react.dev/) - React framework docs
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Build tool and dev server

### Markdown
- [Markdown Guide](https://www.markdownguide.org/) - Complete markdown reference
- [CommonMark](https://commonmark.org/) - Markdown specification
- [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) - Quick reference

### APIs & Services
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) - Fake API for testing
- [Lorem Picsum](https://picsum.photos/) - Random placeholder images
- [Lorem Ipsum](https://www.lipsum.com/) - Placeholder text generator

## 📖 Learning Resources

### AI & Machine Learning
- [Coursera AI Courses](https://www.coursera.org/browse/data-science/machine-learning) - Online AI education
- [Fast.ai](https://www.fast.ai/) - Practical deep learning
- [OpenAI Documentation](https://platform.openai.com/docs) - AI API documentation
- [Hugging Face](https://huggingface.co/) - AI model hub and community

### Writing Craft
- [MasterClass Writing](https://www.masterclass.com/categories/writing) - Writing courses by famous authors
- [The Write Practice](https://thewritepractice.com/) - Writing exercises and tips
- [Writer's Workshop](https://writersworkshop.co.uk/) - Online writing courses
- [Reedsy Learning](https://blog.reedsy.com/learning/) - Free writing courses

### Design & UX
- [Dribbble](https://dribbble.com/) - Design inspiration
- [Behance](https://www.behance.net/) - Creative portfolios
- [UI/UX Design Patterns](https://ui-patterns.com/) - Interface design patterns
- [Color Hunt](https://colorhunt.co/) - Color palette inspiration

## 🔧 Productivity Tools

### Note-Taking
- [Notion](https://www.notion.so/) - All-in-one workspace
- [Obsidian](https://obsidian.md/) - Knowledge management
- [Roam Research](https://roamresearch.com/) - Networked thought
- [Logseq](https://logseq.com/) - Local-first knowledge base

### Project Management
- [Trello](https://trello.com/) - Kanban boards
- [Asana](https://asana.com/) - Team project management
- [Monday.com](https://monday.com/) - Work operating system
- [ClickUp](https://clickup.com/) - All-in-one productivity

### Time Management
- [Pomodoro Technique](https://francescocirillo.com/pages/pomodoro-technique) - Time management method
- [Forest App](https://www.forestapp.cc/) - Focus and productivity
- [RescueTime](https://www.rescuetime.com/) - Time tracking
- [Toggl](https://toggl.com/) - Time tracking for projects

## 🌐 Browser Extensions

### Writing
- [Grammarly Extension](https://www.grammarly.com/browser) - Grammar checking everywhere
- [LanguageTool](https://languagetool.org/) - Multilingual grammar checker
- [Mercury Reader](https://mercury.postlight.com/reader/) - Clean reading experience

### Productivity
- [uBlock Origin](https://ublockorigin.com/) - Ad blocker
- [LastPass](https://www.lastpass.com/) - Password manager
- [Pocket](https://getpocket.com/) - Save articles for later
- [Dark Reader](https://darkreader.org/) - Dark mode for websites

## 📱 Mobile Apps

### Writing
- [Ulysses](https://ulysses.app/) - Writing app for iOS/Mac
- [iA Writer](https://ia.net/writer) - Distraction-free writing
- [JotterPad](https://jotterpad.app/) - Writing app for Android
- [Bear](https://bear.app/) - Note-taking and writing

### AI Assistants
- [ChatGPT Mobile](https://openai.com/chatgpt/mobile/) - OpenAI's mobile app
- [Google Assistant](https://assistant.google.com/) - Voice assistant
- [Otter.ai](https://otter.ai/) - AI meeting notes and transcription

## 🎓 Educational Platforms

### Online Learning
- [Coursera](https://www.coursera.org/) - University courses online
- [edX](https://www.edx.org/) - Free online courses
- [Udemy](https://www.udemy.com/) - Practical skills courses
- [Khan Academy](https://www.khanacademy.org/) - Free education for everyone

### Coding & Development
- [freeCodeCamp](https://www.freecodecamp.org/) - Learn to code for free
- [Codecademy](https://www.codecademy.com/) - Interactive coding lessons
- [GitHub](https://github.com/) - Code hosting and collaboration
- [Stack Overflow](https://stackoverflow.com/) - Programming Q&A

## 🔍 Research Tools

### Academic
- [Google Scholar](https://scholar.google.com/) - Academic search engine
- [JSTOR](https://www.jstor.org/) - Academic papers and books
- [ResearchGate](https://www.researchgate.net/) - Scientific network
- [Academia.edu](https://www.academia.edu/) - Academic papers sharing

### General Research
- [Wikipedia](https://www.wikipedia.org/) - Free encyclopedia
- [Wolfram Alpha](https://www.wolframalpha.com/) - Computational knowledge
- [Internet Archive](https://archive.org/) - Digital library
- [Library of Congress](https://www.loc.gov/) - US national library

---

## 💡 Pro Tips for Using These Resources

1. **Bookmark frequently used tools** for quick access
2. **Try free versions first** before committing to paid services
3. **Join communities** related to your writing interests
4. **Follow tutorials** to maximize tool effectiveness
5. **Stay updated** with new AI and writing technologies

---

*Happy writing and creating! 🚀*\`;
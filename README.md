# Email Signature Generator for Optimite

A professional email signature generator tool designed to create elegant, branded email signatures for Optimite team members. This application provides an intuitive interface to generate HTML-based email signatures that can be seamlessly integrated into any email client.

## Overview

The Email Signature Generator simplifies the process of creating consistent, professional email signatures across your organization. With a user-friendly interface and real-time preview functionality, users can customize their signatures with personal information, social media links, and company branding elements.

## Key Features

- **Real-time Preview**: Instantly see how your signature looks as you make changes
- - **Social Media Integration**: Add links to your professional social media profiles
  - - **HTML Output**: Generate clean HTML code for easy integration into email clients
    - - **Profile Image Support**: Include your professional photo in the signature
      - - **Location Display**: Showcase your office location with integrated mapping
        - - **Professional Branding**: Pre-configured with Optimite branding and styling
          - - **One-Click Copy**: Easily copy generated HTML signature to clipboard
           
            - ## Getting Started
           
            - ### Prerequisites
           
            - Before you begin, ensure you have the following installed:
            - - Node.js (v14 or higher)
              - - npm or yarn package manager
               
                - ### Installation
               
                - 1. Clone the repository:
                  2. ```bash
                     git clone https://github.com/aavuShgit/ESG.git
                     cd ESG
                     ```

                     2. Install dependencies:
                     3. ```bash
                        npm install
                        ```
                        or
                        ```bash
                        yarn install
                        ```

                        3. Start the development server:
                        4. ```bash
                           npm run dev
                           ```
                           or
                           ```bash
                           yarn dev
                           ```

                           4. Open your browser and navigate to the local development server (typically http://localhost:5173)
                          
                           5. ## How to Use
                          
                           6. ### Step 1: Enter Your Information
                          
                           7. Fill in the form fields with your personal and professional details:
                           8. - **Full Name**: Your complete name as it should appear in the signature
                              - - **Job Title/Designation**: Your position within the company
                                - - **Company Name**: Organization name (default: Optimite)
                                  - - **Phone Number**: Your business contact number
                                    - - **Email Address**: Your professional email
                                      - - **Profile Photo**: Upload or provide URL for your professional headshot
                                        - - **Social Media Links**: Add links to LinkedIn, Twitter, and other professional networks
                                         
                                          - ### Step 2: Preview Your Signature
                                         
                                          - As you fill in the information, a live preview of your email signature will be displayed on the screen. This allows you to:
                                          - - Review the formatting and layout
                                            - - Check for any typos or errors
                                              - - Ensure all links are working correctly
                                                - - Verify the visual appearance matches your expectations
                                                 
                                                  - ### Step 3: Generate and Copy
                                                 
                                                  - Once you are satisfied with your signature:
                                                  - 1. Click the "Generate" button
                                                    2. 2. The HTML code for your signature will be generated
                                                       3. 3. Click the "Copy Signature" button to copy the HTML to your clipboard
                                                          4. 4. A confirmation message will appear once copied successfully
                                                            
                                                             5. ### Step 4: Add to Your Email Client
                                                            
                                                             6. Paste the copied HTML signature into your email client's signature settings:
                                                            
                                                             7. #### Gmail
                                                             8. 1. Open Gmail Settings (click the gear icon)
                                                                2. 2. Go to "See all settings"
                                                                   3. 3. Scroll down to the "Signature" section
                                                                      4. 4. Click "Create new" or select an existing signature to edit
                                                                         5. 5. Paste the HTML code using Ctrl+V (Windows) or Cmd+V (Mac)
                                                                            6. 6. Click "Save Changes" at the bottom of the page
                                                                              
                                                                               7. #### Outlook
                                                                               8. 1. Open Outlook Settings (click the gear icon)
                                                                                  2. 2. Go to "View all Outlook settings"
                                                                                     3. 3. Select "Compose and reply"
                                                                                        4. 4. Under "Email signature" section, paste the HTML code
                                                                                           5. 5. Click "Save" to apply changes
                                                                                             
                                                                                              6. #### Apple Mail
                                                                                              7. 1. Open Mail application
                                                                                                 2. 2. Go to Mail menu and select Preferences
                                                                                                    3. 3. Click on the "Signatures" tab
                                                                                                    4. Click the "+" button to create a new signature
                                                                                                    5. 5. Paste the HTML code into the signature editor
                                                                                                    6. Close preferences window to save
                                                                                                   
                                                                                                    7. #### Thunderbird
                                                                                                    8. 1. Go to Tools menu and select "Account Settings"
                                                                                                       2. 2. Select your email account from the left sidebar
                                                                                                          3. 3. Check "Use HTML" checkbox in the signature settings
                                                                                                             4. 4. Paste the HTML code into the signature text area
                                                                                                                5. 5. Click "OK" to save your changes
                                                                                                                  
                                                                                                                   6. ## Technology Stack
                                                                                                                  
                                                                                                                   7. - **React**: Frontend framework for building the user interface
                                                                                                                      - - **Vite**: Fast build tool and development server
                                                                                                                        - - **Tailwind CSS**: Utility-first CSS framework for styling
                                                                                                                          - - **JavaScript/JSX**: Core programming language
                                                                                                                           
                                                                                                                            - ## Project Structure
                                                                                                                           
                                                                                                                            - ```
                                                                                                                              ESG/
                                                                                                                                public/              - Static assets
                                                                                                                                src/
                                                                                                                                  components/        - React components
                                                                                                                                    Generator.jsx    - Main signature generator component
                                                                                                                                  db/               - Data files (logo images, etc.)
                                                                                                                                  email/            - Email signature templates
                                                                                                                                    signatureTemplate.js  - HTML template generator
                                                                                                                                  App.jsx           - Main application component
                                                                                                                                  index.css         - Global styles
                                                                                                                                  main.jsx          - Application entry point
                                                                                                                                package.json        - Project dependencies
                                                                                                                                vite.config.js      - Vite configuration
                                                                                                                                README.md          - Project documentation
                                                                                                                              ```
                                                                                                                              
                                                                                                                              ## Features in Detail
                                                                                                                              
                                                                                                                              ### Customizable Fields
                                                                                                                              
                                                                                                                              The generator supports the following customizable fields:
                                                                                                                              - Full name
                                                                                                                              - - Job title/designation
                                                                                                                                - - Company name
                                                                                                                                  - - Phone number
                                                                                                                                    - - Email address
                                                                                                                                      - - Profile photo
                                                                                                                                        - - Social media links (LinkedIn, Twitter, Facebook, Instagram, etc.)
                                                                                                                                          - - Custom tagline
                                                                                                                                            - - Office location
                                                                                                                                             
                                                                                                                                              - ### Generated Signature Includes
                                                                                                                                             
                                                                                                                                              - - Professional headshot with rounded styling
                                                                                                                                                - - Name displayed in prominent, readable font
                                                                                                                                                  - - Job title and company information
                                                                                                                                                    - - Direct contact details with icons
                                                                                                                                                      - - Social media icons with clickable links
                                                                                                                                                        - - Company tagline
                                                                                                                                                          - - Location indicator for office presence
                                                                                                                                                            - - Responsive design that works across different email clients
                                                                                                                                                             
                                                                                                                                                              - ## Contributing
                                                                                                                                                             
                                                                                                                                                              - Contributions are welcome! If you would like to improve this project:
                                                                                                                                                             
                                                                                                                                                              - 1. Fork the repository
                                                                                                                                                                2. 2. Create a feature branch: `git checkout -b feature/AmazingFeature`
                                                                                                                                                                   3. 3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
                                                                                                                                                                      4. 4. Push to the branch: `git push origin feature/AmazingFeature`
                                                                                                                                                                         5. 5. Open a Pull Request
                                                                                                                                                                           
                                                                                                                                                                            6. ## License
                                                                                                                                                                           
                                                                                                                                                                            7. This project is created for Optimite internal use.
                                                                                                                                                                           
                                                                                                                                                                            8. ## Links
                                                                                                                                                                           
                                                                                                                                                                            9. - **Live Demo**: https://esg-zeta-weld.vercel.app
                                                                                                                                                                               - - **Repository**: https://github.com/aavuShgit/ESG
                                                                                                                                                                                
                                                                                                                                                                                 - ## Support
                                                                                                                                                                                
                                                                                                                                                                                 - If you encounter any issues or have questions, please:
                                                                                                                                                                                 - - Open an issue in the GitHub repository
                                                                                                                                                                                   - - Contact the development team at Optimite
                                                                                                                                                                                    
                                                                                                                                                                                     - ## Customization
                                                                                                                                                                                    
                                                                                                                                                                                     - To customize the signature template for your organization:
                                                                                                                                                                                    
                                                                                                                                                                                     - 1. Edit `src/email/signatureTemplate.js` to modify the HTML structure and layout
                                                                                                                                                                                       2. 2. Update inline styling in the template file to match your brand colors
                                                                                                                                                                                          3. 3. Replace logo images in the `public` directory with your company logos
                                                                                                                                                                                             4. 4. Modify default company information in `src/components/Generator.jsx`
                                                                                                                                                                                               
                                                                                                                                                                                                5. ## Troubleshooting
                                                                                                                                                                                               
                                                                                                                                                                                                6. ### Common Issues
                                                                                                                                                                                               
                                                                                                                                                                                                7. **Signature not displaying correctly in email client:**
                                                                                                                                                                                                8. - Ensure you are pasting the HTML code, not plain text
                                                                                                                                                                                                - Some email clients may strip certain CSS styles - use inline styles for best compatibility
                                                                                                                                                                                                - - Clear your email client cache and restart if needed
                                                                                                                                                                                                 
                                                                                                                                                                                                  - **Images not showing:**
                                                                                                                                                                                                  - - Verify that image URLs are publicly accessible
                                                                                                                                                                                                    - - Check that image paths are absolute URLs, not relative paths
                                                                                                                                                                                                      - - Ensure images are hosted on a reliable server
                                                                                                                                                                                                       
                                                                                                                                                                                                        - **Links not working:**
                                                                                                                                                                                                        - - Make sure URLs include the full protocol (https://)
                                                                                                                                                                                                          - - Test each social media link before finalizing
                                                                                                                                                                                                            - - Check for any typos in the URL fields
                                                                                                                                                                                                             
                                                                                                                                                                                                              - ---
                                                                                                                                                                                                              
                                                                                                                                                                                                              Made with care by the Optimite Team

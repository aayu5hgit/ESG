export function generateSignature(user) {
    return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
  <html>
    <head>
      <title>Optimite | Email Signature</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    </head>
  
    <body
      style="
        margin: 0;
        padding: 20px 0 0 4px;
        font-size: 10pt;
        font-family: Gilroy-Regular, Gilroy, -apple-system, BlinkMacSystemFont,
          'Segoe UI', Arial, sans-serif;
      "
    >
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          width: 395px;
          font-size: 11pt;
          font-family: Gilroy-Regular, Gilroy, -apple-system, BlinkMacSystemFont,
            'Segoe UI', Arial, sans-serif;
        "
      >
        <tbody>
          <tr style="vertical-align: top;">
            
            <!-- PROFILE IMAGE (DYNAMIC) -->
            <td style=" vertical-align: top; padding-right: 8px;">
                <img
                  src="${user.photo}"
                  width="100"
                  style="display:block; border:0; width:100px; height:auto;"
                />
            </td>
  
            <!-- DETAILS -->
            <td style="vertical-align: top;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
  
                <!-- NAME (DYNAMIC) -->
                <tr>
                  <td
                    style="
                      font-size: 11pt;
                      font-family: Gilroy-Bold, Gilroy, Arial, sans-serif;
                      color: #003c39;
                      line-height: 14pt;
                    "
                  >
                    ${user.name}
                  </td>
                </tr>
  
                <!-- EMAIL (DYNAMIC) -->
                <tr>
                  <td
                    style="
                      padding-top: 2px;
                      font-size: 9pt;
                      font-family: Gilroy-Regular, Gilroy, Arial, sans-serif;
                      color: #333333;
                      line-height: 13pt;
                    "
                  >
                    <a
                      href="mailto:${user.email}"
                      style="color:#333333; text-decoration:none;"
                    >
                      ${user.email}
                    </a>
                  </td>
                </tr>
  
                <!-- DESIGNATION (DYNAMIC) -->
                <tr>
                  <td
                    style="
                      padding-top: 12px;
                      font-size: 9pt;
                      font-family: Gilroy-Regular, Gilroy, Arial, sans-serif;
                      color: #333333;
                      line-height: 13pt;
                    "
                  >
                    ${user.title} |
                    <a
                      href="https://optimite.ai"
                      style="text-decoration:none; color:#333333;"
                    >
                      Optimite
                    </a>
                  </td>
                </tr>
  
                <!-- TAGLINE (DYNAMIC — FIXED NOW) -->
                <tr>
                  <td
                    style="
                      padding-top: 4px;
                      font-size: 9pt;
                      font-family: Gilroy-Bold, Gilroy, Arial, sans-serif;
                      color: #003c39;
                      line-height: 13pt;
                    "
                  >
                  Your Favourite Email Marketing Agency 💚
                  </td>
                </tr>
  
                <!-- LOCATIONS (STATIC) -->
                <tr>
                 
                  <td
                  style="
                    padding-top: 12px;
                    font-size: 9pt;
                    font-family: Gilroy-Regular, Arial, sans-serif;
                    color: #333333;
                    line-height: 13pt;
                    white-space: nowrap;
                  "
                >
                  <a
                    href="https://optimite.ai"
                    style="
                      text-decoration: none;
                      color: #333333;
                      white-space: nowrap;
                    "
                  >
                    <!-- INDIA -->
                    <img
                      src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/ind-png.png"
                      width="14"
                      style="
                        display: inline-block;
                        vertical-align: middle;
                        border: 0;
                      "
                    />
                    <span
                      style="
                        display: inline-block;
                        vertical-align: middle;
                        padding-left: 4px;
                      "
                    >
                      India
                    </span>
                
                    <!-- DOT -->
                    <span
                      style="
                        display: inline-block;
                        vertical-align: middle;
                        padding: 0 6px;
                        color: #9fb7b5;
                      "
                    >
                      •
                    </span>
                
                    <!-- UAE -->
                    <img
                      src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/uae-png.png"
                      width="14"
                      style="
                        display: inline-block;
                        vertical-align: middle;
                        border: 0;
                      "
                    />
                    <span
                      style="
                        display: inline-block;
                        vertical-align: middle;
                        padding-left: 4px;
                      "
                    >
                      Dubai
                    </span>
                  </a>
                </td>
                
                
                </tr>
  
              </table>
            </td>
  
            <!-- DIVIDER -->
            <td style="width:10px; border-right:1px solid #003c392e;"></td>
            <td style="width:10px;"></td>
  
            <!-- SOCIALS (STATIC) -->
            <td style="width:32px; vertical-align: top; padding-top:4px;">
              <table cellpadding="0" cellspacing="0" border="0" width="32">
                <tr>
                  <td style="padding-bottom:6px;">
                    <a href="https://in.linkedin.com/company/optimite" target="_blank">
                      <img src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/Linedinnn.png" width="20" style="display:block; border:0;" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:6px;">
                    <a href="https://www.instagram.com/optimite_official/?hl=en" target="_blank">
                      <img src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/IG.png" width="20" style="display:block; border:0;" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom:6px;">
                    <a href="https://www.behance.net/optimite_ai" target="_blank">
                      <img src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/behanceee.png" width="20" style="display:block; border:0;" />
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://dribbble.com/optimite" target="_blank">
                      <img src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/DRIB.png" width="20" style="display:block; border:0;" />
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  
          <!-- BANNER (STATIC) -->
          <tr>
            <td colspan="5" style="padding-top:12px;">
              <img
                src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/GOLD-F-Banner.png"
                style="display:block; width:380px; height:auto; border:0;"
              />
            </td>
          </tr>
  
        </tbody>
      </table>
    </body>
  </html>
  `;
  }
  
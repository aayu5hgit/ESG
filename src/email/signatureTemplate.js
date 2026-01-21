export function generateSignature(user) {
  return `
<table cellpadding="0" cellspacing="0" border="0"
  style="
    width:395px;
    font-family:Arial, sans-serif;
    font-size:9pt;
    border-collapse:collapse;
    mso-table-lspace:0pt;
    mso-table-rspace:0pt;
  "
>
  <tbody>
    <tr valign="top">

      <!-- PROFILE IMAGE -->
      <td width="100" style="width:100px; padding-right:8px; vertical-align:top;">
        <img
          src="${user.photo}"
          width="90"
          style="
            width:90px;
            height:auto;
            display:block;
            border:0;
            border-radius:8px;
          "
          alt="${user.name}"
        />
      </td>

      <!-- DETAILS -->
      <td valign="top" style="vertical-align:top; margin-left: 10px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">

          <!-- NAME -->
          <tr>
            <td height="18" style="height:18px; line-height:14pt;">
              <span
                style="
                  color: #333333;
                  font-size:9pt;
                  font-weight:bold;
                "
              >
                ${user.name}
              </span>
            </td>
          </tr>

          <!-- EMAIL -->
          <tr>
          <td  style="color: #274e13; vertical-align: top; FONT-SIZE: 9pt; height:40px; text-decoration: none;">
              ${user.email}
      </td>
          </tr>

          <!-- DESIGNATION -->
          <tr>
            <td line-height:13pt;">
              <span style="color:#333333;  
              font-family:Arial, sans-serif;
              font-size:9pt;">
                ${user.title} |
              </span>
              
                <span style="color:#333333; text-decoration:none;">
                  Optimite 
                </span>
            </td>
          </tr>


          <!-- TAGLINE -->
<tr>
  <td
    style="
      padding-y:4px;
      font-size:8pt;
      font-family: Arial, sans-serif;
      font-weight:bold;
      color:#003c39;
      line-height:12pt;
      white-space:nowrap;
    "
  >
    Your Favourite Email Marketing Agency💚
  </td>
</tr>


          <!-- LOCATIONS -->
          <tr>

            <td
                style="
                  padding-top: 12px;
                  font-size: 9pt;
                  color: #333333;
                  line-height: 13pt;
                  white-space: nowrap;
                "
                >
               
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
                  &nbsp; India
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
                    • &nbsp;
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
                  &nbsp; Dubai
                  </span>
                </td>
          </tr>

        </table>
      </td>

      <!-- DIVIDER -->
      <td width="10" style="width:10px; border-right:1px solid #003c392e;"></td>
      <td width="10" style="width:10px;"></td>

      <!-- SOCIALS -->
      <td width="32" valign="top" style="width:32px; padding-top:2px;">
        <table cellpadding="0" cellspacing="0" border="0" width="32">
          <tr>
            <td height="22">
              <a href="https://in.linkedin.com/company/optimite" style="text-decoration:none;">
                <img src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/Linedinnn.png" width="20" style="border:0; display:block;" />
              </a>
            </td>
          </tr>
          <tr>
            <td height="22">
              <a href="https://www.instagram.com/optimite_official/?hl=en" style="text-decoration:none;">
                <img src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/IG.png" width="20" style="border:0; display:block;" />
              </a>
            </td>
          </tr>
          <tr>
            <td height="22">
              <a href="https://www.behance.net/optimite_ai" style="text-decoration:none;">
                <img src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/behanceee.png" width="20" style="border:0; display:block;" />
              </a>
            </td>
          </tr>
          <tr>
            <td height="22">
              <a href="https://dribbble.com/optimite" style="text-decoration:none;">
                <img src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/DRIB.png" width="20" style="border:0; display:block;" />
              </a>
            </td>
          </tr>
        </table>
      </td>

    </tr>

    <!-- BANNER -->
    <tr>
      <td colspan="5" style="padding-top:12px;">
        <img
          src="https://raw.githubusercontent.com/aayu5hgit/Optimite-Email-Signature/refs/heads/main/GOLD-F-Banner.png"
          width="380"
          style="display:block; border:0; width:380px; height:auto;"
        />
      </td>
    </tr>

  </tbody>
</table>
`;
}

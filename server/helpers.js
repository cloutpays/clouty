const connect = require('./helpers/db');

export const dev =
  process.env.NODE_ENV === 'development' || process.env.ENV === 'development';
export const question = dev ? 'questiondev' : 'question';
export const cloutpays = dev ? 'cloutpaysdev' : 'cloutpays';
export const user = dev ? 'userdev' : 'user';
export const payout = dev ? 'payoutdev' : 'payout';

export const wrapAsync = (handler) => async (req, res) => {
  const db = await connect();
  return handler(req, db)
    .then((result) => {
      res.setHeader(
        'cache-control',
        's-maxage=1 maxage=0, stale-while-revalidate',
      );
      return res.json(result);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

export const emailContent = `<td align="center" valign="top" id="m_-1396599709566700233templateBody"
  style="background:#ffffff none no-repeat center/cover;background-color:#ffffff;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:27px;padding-bottom:54px">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
    class="m_-1396599709566700233templateContainer" style="border-collapse:collapse;max-width:600px!important">
    <tbody>
      <tr>
        <td valign="top" class="m_-1396599709566700233bodyContainer"
          style="background:transparent none no-repeat center/cover;background-color:transparent;background-image:none;background-repeat:no-repeat;background-position:center;background-size:cover;border-top:0;border-bottom:0;padding-top:0;padding-bottom:0">
          <font color="#550055">
            <table border="0" cellpadding="0" cellspacing="0" width="100%"
              style="min-width:100%;border-collapse:collapse">
              <tbody>
                <tr>
                  <td valign="top" style="padding-top:9px">
                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                      style="max-width:100%;min-width:100%;border-collapse:collapse" width="100%"
                      class="m_-1396599709566700233mcnTextContentContainer">
                      <tbody>
                        <tr>
                          <td valign="top" class="m_-1396599709566700233mcnTextContent"
                            style="padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px;word-break:break-word;color:#757575;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">
                            <h1
                              style="display:block;margin:0;padding:0;color:#222222;font-family:Helvetica;font-size:40px;font-style:normal;font-weight:bold;line-height:150%;letter-spacing:normal;text-align:center">
                              Welcome to
                              Clouty.
                            </h1>
                            <p
                              style="text-align:center!important;margin:10px 0;padding:0;color:#757575;font-family:Helvetica;font-size:16px;line-height:150%">
                              The world's
                              first music
                              betting
                              platform.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-1396599709566700233mcnDividerBlock"
              style="min-width:100%;border-collapse:collapse;table-layout:fixed!important">
              <tbody>
                <tr>
                  <td style="min-width:100%;padding:18px 18px 0px">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                      style="min-width:100%;border-collapse:collapse">
                      <tbody>
                        <tr>
                          <td>
                            <span></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%"
              style="min-width:100%;border-collapse:collapse">
              <tbody>
                <tr>
                  <td valign="top" style="padding:9px">
                    <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0"
                      style="min-width:100%;border-collapse:collapse">
                      <tbody>
                        <tr>
                          <td valign="top"
                            style="padding-right:9px;padding-left:9px;padding-top:0;padding-bottom:0;text-align:center">
                            <img align="center" alt=""
                              src="https://ci5.googleusercontent.com/proxy/L_OPcuoQM20ydtbMZSzQAioa0hjT0qnQqVEoGlsLGMZAFwpWdHu_ybAKiMPj20oD-ZSu9V5zwjQg3qauum2gAIHdQwRL-3f3zTKLfer2yznXy-poRa3RaBhQfKMaF_IPtVGoqdbFh0ln102LOjG_Co7DaqawUQ=s0-d-e1-ft#https://mcusercontent.com/b930e7c77036dd2a9685eb47e/images/a9c44b37-6aa2-4e3c-bdda-fdfa53fe955e.jpg"
                              width="564"
                              style="max-width:648px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none"
                              class="m_-1396599709566700233mcnImage">
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="m_-1396599709566700233mcnDividerBlock"
              style="min-width:100%;border-collapse:collapse;table-layout:fixed!important">
              <tbody>
                <tr>
                  <td style="min-width:100%;padding:18px">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                      style="min-width:100%;border-collapse:collapse">
                      <tbody>
                        <tr>
                          <td>
                            <span></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </font>
          <font color="#550055">
            <table border="0" cellpadding="0" cellspacing="0" width="100%"
              style="min-width:100%;border-collapse:collapse">
              <tbody>
                <tr>
                  <td valign="top" style="padding-top:9px">
                    <table align="left" border="0" cellpadding="0" cellspacing="0"
                      style="max-width:100%;min-width:100%;border-collapse:collapse" width="100%"
                      class="m_-1396599709566700233mcnTextContentContainer">
                      <tbody>
                        <tr>
                          <td valign="top" class="m_-1396599709566700233mcnTextContent"
                            style="padding-top:0;padding-right:18px;padding-bottom:9px;padding-left:18px;word-break:break-word;color:#757575;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">
                            <h3
                              style="display:block;margin:0;padding:0;color:#444444;font-family:Helvetica;font-size:22px;font-style:normal;font-weight:bold;line-height:150%;letter-spacing:normal;text-align:left">
                              Submit your
                              own
                              questions
                              for betting
                            </h3>
                            <p
                              style="margin:10px 0;padding:0;color:#757575;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">
                              At Clouty we
                              encourage
                              the notion
                              of
                              engagement
                              and
                              creativity
                              which is why
                              we allowed
                              the "create
                              a game"
                              feature.
                              There are a
                              lot of
                              artists in
                              the universe
                              and we want
                              to encourage
                              new music
                              discovery
                              through
                              music bets.
                            </p>
                            <p
                              style="margin:10px 0;padding:0;color:#757575;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">
                              Every
                              question
                              that is
                              approved to
                              be placed on
                              our leader
                              board will
                              kick back a
                              percentage
                              of the
                              contest back
                              to the game
                              creator.
                            </p>
                            <p
                              style="margin:10px 0;padding:0;color:#757575;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">
                              As we begin
                              to roll out
                              engagement
                              between user
                              accounts,
                              game players
                              globally
                              will begin
                              to interact
                              with each
                              other.
                            </p>
                            <p
                              style="margin:10px 0;padding:0;color:#757575;font-family:Helvetica;font-size:16px;line-height:150%;text-align:left">
                              For all
                              questions
                              email
                              <strong><a href="mailto:info@clouty.io" target="_blank">info@clouty.io</a></strong>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </font>
          <table border="0" cellpadding="0" cellspacing="0" width="100%"
            style="min-width:100%;border-collapse:collapse">
            <tbody>
              <tr>
                <td valign="top" style="padding:9px">
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0"
                    style="min-width:100%;border-collapse:collapse">
                    <tbody>
                      <tr>
                        <td valign="top"
                          style="padding-right:9px;padding-left:9px;padding-top:0;padding-bottom:0;text-align:center">
                          <img align="center" alt=""
                            src="https://ci6.googleusercontent.com/proxy/-gtEfYy1LDZ6zfyq7mpLCBgCehTKY_pONiiAmNFNxhGdNU49KYp9d8vtJzYGlsbFivETHU2-ypI436r-wVDhvMZOFUQ8kTX906bQBQlnnKvkyaks5Tt_UF7bSOaoDATstw1n30S14DHZmbRogs-kvbQBTtnsHQ=s0-d-e1-ft#https://mcusercontent.com/b930e7c77036dd2a9685eb47e/images/d1dcd907-8dfe-4115-84e3-bfb4900eb561.png"
                            width="564"
                            style="max-width:1205px;padding-bottom:0;display:inline!important;vertical-align:bottom;border:0;height:auto;outline:none;text-decoration:none"
                            class="m_-1396599709566700233mcnImage">
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</td>`;
